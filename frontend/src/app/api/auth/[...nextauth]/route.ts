import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          // Call your Spring Boot login endpoint
          const res = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            headers: { "Content-Type": "application/json" },
          });

          if (!res.ok) {
            return null;
          }

          const user = await res.json();

          // Return user with tokens
          if (user && user.token) {
            return {
              id: user.id,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              accessToken: user.token.accessToken,
              refreshToken: user.token.refreshToken,
            };
          }

          return null;
        } catch (e) {
          console.error("Auth error:", e);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Initial login - user object exists
      if (user) {
        const userData = user as any;
        token.id = userData.id;
        token.email = userData.email;
        token.firstName = userData.firstName;
        token.lastName = userData.lastName;
        token.accessToken = userData.accessToken;
        token.refreshToken = userData.refreshToken;
        token.accessTokenExpires = Date.now() + 1 * 60 * 60 * 1000; // 1 hour
      }

      // Return previous token if access token hasn't expired yet
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      // Access token has expired, try to refresh it
      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      // Pass token data to session
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        (session as any).user.firstName = token.firstName;
        (session as any).user.lastName = token.lastName;
        (session as any).accessToken = token.accessToken;
        (session as any).refreshToken = token.refreshToken;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },

  jwt: {
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET || "your-secret-key-change-in-production",
};

async function refreshAccessToken(token: any) {
  try {
    const res = await fetch("http://localhost:8080/api/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken: token.refreshToken,
      }),
    });

    if (!res.ok) {
      throw new Error("Refresh failed");
    }

    const data = await res.json();

    return {
      ...token,
      accessToken: data.accessToken,
      accessTokenExpires: Date.now() + 1 * 60 * 60 * 1000, // 1 hour
    };
  } catch (error) {
    console.error("Refresh token error:", error);
    return {
      ...token,
      error: "RefreshTokenError",
    };
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
