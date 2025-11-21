import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/db";

export async function ensureUserFromClerk() {
  const user = await currentUser();

  if (!user) {
    throw new Error("Usuario no autenticado");
  }

  const existing = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (existing) return existing;

  return prisma.user.create({
    data: {
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress ?? "",
      name: user.firstName + " " + user.lastName || null,
      imageUrl: user.imageUrl ?? null,
    },
  });
}