import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/signin",
  },
});

export const config = {
  matcher: ["/dashboard", "/api-playground", "/documentation", "/invoices", "/research-assistant", "/research-reports"],
};

