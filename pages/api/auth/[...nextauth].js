import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        const { email, password } = credentials;
        try {
          const response = await fetch("http://127.0.0.1:8000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email,
              password,
            }),
          });

          

          const user = await response.json();
          console.log(user);
          if (!user.success) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          if (user.success && user) {
            return user.user;
          } else {
            return null;
          }
        } catch (error) {
          console.log(error);
        }
      },
      callbacks: {
        async jwt({ token, user }) {
          // user && (token.user = user);
          return { ...token, ...user };
        },
        async signIn({ user, account, profile, email, credentials }) {
          return true;
        },
        async session({ session, token }) {
          // session.expires = token.user.expirationTime;
          session.user = token;
          return session;
        },
      },
    }),
    // ...add more providers here
  ],
  session: {
    // strategy: "jwt",
    jwt: true,
  },
  pages: {
    signIn: "/auth/login",
  },
  debug: true,
};

export default NextAuth(authOptions);
