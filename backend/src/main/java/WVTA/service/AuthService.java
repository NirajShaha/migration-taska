package WVTA.service;

import WVTA.dto.LoginDTO;
import WVTA.dto.LoginResponseDTO;
import WVTA.dto.AuthTokenDTO;
import WVTA.dto.RefreshTokenRequestDTO;
import WVTA.entity.UserEntity;
import WVTA.entity.RefreshTokenEntity;
import WVTA.repository.UserRepository;
import WVTA.repository.RefreshTokenRepository;
import WVTA.util.JwtUtil;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@Transactional
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Autowired
    private JwtUtil jwtUtil;

    public ResponseEntity<LoginResponseDTO> login(LoginDTO loginDTO) {
        UserEntity user = userRepository.findByEmailAndPassword(loginDTO.getEmail(), loginDTO.getPassword());

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        if (!user.getPassword().equals(loginDTO.getPassword())) {
            throw new RuntimeException("Invalid Credentials");
        }

        // Generate tokens
        String accessToken = jwtUtil.generateAccessToken(user.getId(), user.getEmail());
        String refreshToken = jwtUtil.generateRefreshToken(user.getId());

        // Save refresh token to database
        RefreshTokenEntity refreshTokenEntity = new RefreshTokenEntity();
        refreshTokenEntity.setToken(refreshToken);
        refreshTokenEntity.setUserId(user.getId());
        refreshTokenEntity.setCreatedAt(LocalDateTime.now());
        refreshTokenEntity.setExpiryDate(LocalDateTime.now().plusDays(7));
        refreshTokenRepository.save(refreshTokenEntity);

        // Create response with tokens
        AuthTokenDTO tokenDTO = new AuthTokenDTO(
                accessToken,
                refreshToken,
                jwtUtil.getJwtExpiration(),
                jwtUtil.getRefreshTokenExpiration(),
                "Bearer"
        );

        LoginResponseDTO response = new LoginResponseDTO(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                tokenDTO
        );

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    public ResponseEntity<AuthTokenDTO> refreshAccessToken(RefreshTokenRequestDTO request) {
        String refreshToken = request.getRefreshToken();

        // Validate refresh token from database
        RefreshTokenEntity tokenEntity = refreshTokenRepository.findByToken(refreshToken)
                .orElseThrow(() -> new RuntimeException("Invalid refresh token"));

        if (!tokenEntity.isValid()) {
            throw new RuntimeException("Refresh token is expired or revoked");
        }

        // Extract user ID and generate new access token
        String userId = jwtUtil.extractUserId(refreshToken);
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String newAccessToken = jwtUtil.generateAccessToken(user.getId(), user.getEmail());

        AuthTokenDTO response = new AuthTokenDTO(
                newAccessToken,
                refreshToken,
                jwtUtil.getJwtExpiration(),
                jwtUtil.getRefreshTokenExpiration(),
                "Bearer"
        );

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    public ResponseEntity<String> logout(String userId) {
        // Invalidate all refresh tokens for this user
        refreshTokenRepository.deleteByUserId(userId);
        return ResponseEntity.status(HttpStatus.OK).body("Logout successful");
    }

    public ResponseEntity<String> revokeRefreshToken(String refreshToken) {
        RefreshTokenEntity tokenEntity = refreshTokenRepository.findByToken(refreshToken)
                .orElseThrow(() -> new RuntimeException("Invalid refresh token"));

        tokenEntity.setRevokedAt(LocalDateTime.now());
        refreshTokenRepository.save(tokenEntity);

        return ResponseEntity.status(HttpStatus.OK).body("Refresh token revoked");
    }
}
