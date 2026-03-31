package WVTA.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "refresh_tokens")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RefreshTokenEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false, unique = true, columnDefinition = "LONGTEXT")
    private String token;

    @Column(nullable = false)
    private String userId;

    @Column(nullable = false)
    private LocalDateTime expiryDate;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column
    private LocalDateTime revokedAt;

    /**
     * Check if token is valid (not expired and not revoked)
     */
    public Boolean isValid() {
        return !isExpired() && revokedAt == null;
    }

    /**
     * Check if token is expired
     */
    public Boolean isExpired() {
        return LocalDateTime.now().isAfter(expiryDate);
    }
}
