import NextAuth from "next-auth";
import fs from 'fs';
import path from 'path';
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // 读取mock数据
        const mockPath = path.join(process.cwd(), 'mock/auth.json');
        const mockData = JSON.parse(fs.readFileSync(mockPath, 'utf8'));

        // 在实际项目中这里应该验证真实凭据
        if (credentials?.username && credentials?.password) {
          return mockData.user;
        }
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // 假设从mock数据返回的用户对象包含role属性，使用类型断言
        token.role = (user as { role: string }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        // 为 session.user 添加 role 属性，使用类型断言
        (session.user as unknown as { id: string; role: string }).role = token.role as string;
      }
      return session;
    }
  }
});