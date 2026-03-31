package WVTA.contorller;

import WVTA.dto.LoginDTO;
import WVTA.dto.LoginResponseDTO;
import WVTA.dto.AuthTokenDTO;
import WVTA.dto.RefreshTokenRequestDTO;
import WVTA.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginDTO loginDTO) {
        try {
            return authService.login(loginDTO);
        } catch (RuntimeException e) {
            throw new RuntimeException("Error logging in the user: " + e.getMessage(), e);
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthTokenDTO> refreshAccessToken(@RequestBody RefreshTokenRequestDTO request) {
        try {
            return authService.refreshAccessToken(request);
        } catch (RuntimeException e) {
            throw new RuntimeException("Error refreshing token: " + e.getMessage(), e);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestParam String userId) {
        try {
            return authService.logout(userId);
        } catch (RuntimeException e) {
            throw new RuntimeException("Error logging out: " + e.getMessage(), e);
        }
    }

    @PostMapping("/revoke")
    public ResponseEntity<String> revokeRefreshToken(@RequestBody RefreshTokenRequestDTO request) {
        try {
            return authService.revokeRefreshToken(request.getRefreshToken());
        } catch (RuntimeException e) {
            throw new RuntimeException("Error revoking token: " + e.getMessage(), e);
        }
    }
}
