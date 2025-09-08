import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from 'bcrypt'

export const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {email: {type: "text"}, password: {type: "password"}},
        async authorize(credentials) {
            if(!credentials) return null;
            const user = await prisma.user.findUnique({where: {email: credentials.email}});
            if (!user) return null;

            const isValid = await bcrypt.compare(credentials.password, user.password);
            if (!isValid) return null;
            return {id: String(user.id), email: user.email}
        }
})
    ],
    callbacks: {
        async jwt({ token, user }) {
        if (user) token.id = user.id; // store DB id in JWT
        return token;
        },
        async session({ session, token }) {
        if (token?.id) session.user.id = token.id; // make id available in session
        return session;
        },
    },
    session: {strategy: "jwt"}
})

export { handler as GET, handler as POST }