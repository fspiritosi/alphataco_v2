'use server'
import prisma from "@/lib/db";
import {ensureUserFromClerk} from "./user";

export async function getCompaniesUser() {
    const user = await ensureUserFromClerk();
    const companies = await prisma.company.findMany({
        where: {
            owner_id: user.id,
        },
    });
    return {
        companies,
        user,
    };
}

export type GetCompaniesUserType = Awaited<ReturnType<typeof getCompaniesUser>>;

export async function updateUserCurrentCompany(companyId: string) {
    const user = await ensureUserFromClerk();

    await prisma.user.update({
        where: { id: user.id },
        data: { current_company_id: companyId },
    });

    return { success: true };
}