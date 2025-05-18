import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { walletAddress } = await req.json();
    let user = await prisma.user.findUnique({
      where: { walletAddress },
    });

    if (!user) {
      console.log("Creating new user with wallet address:", walletAddress);
      user = await prisma.user.create({
        data: {
          walletAddress,
          tokenBalance: 1000,
        },
      });
    }
    return NextResponse.json({
      id: user.id,
      walletAddress: user.walletAddress,
      tokenBalance: user.tokenBalance,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error('Error connecting wallet:', error);
    return NextResponse.json({ error: "Failed to connect wallet." }, { status: 500 });
  }
}
