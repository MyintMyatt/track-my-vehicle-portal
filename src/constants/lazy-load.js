import { lazy } from "react";
import PageLoader from "../components/core/page-loader";

export const LoginPage=PageLoader(
    lazy(()=>import('../features/auth/pages/pg-login'))
)