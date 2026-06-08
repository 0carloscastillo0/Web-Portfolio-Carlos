import bcrypt from "bcrypt";
import { prisma } from "../../src/config/prisma";

let uniqueCounter = 0;

export const uniqueEmail = () => {
  uniqueCounter += 1;
  return `test-${Date.now()}-${uniqueCounter}@email.com`;
};

export const cleanDatabase = async () => {
  await prisma.imgProject.deleteMany();
  await prisma.skillProject.deleteMany();
  await prisma.project.deleteMany();
  await prisma.education.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.socialLink.deleteMany();
  await prisma.user.deleteMany();
};

export const createUser = async (overrides: any = {}) => {
  const password = overrides.password ?? "Password123";
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      name: overrides.name ?? "Test",
      lastname: overrides.lastname ?? "User",
      email: overrides.email ?? uniqueEmail(),
      password: hashedPassword,
      title: overrides.title ?? "Developer",
      city: overrides.city ?? "Santiago",
      country: overrides.country ?? "Chile",
      description: overrides.description ?? "Test user description",
      urlCV: overrides.urlCV,
      urlPhoto: overrides.urlPhoto,
      refreshTokenHash: overrides.refreshTokenHash,
    },
  });
};

export const createSkill = async (userId: number, overrides: any = {}) => {
  return prisma.skill.create({
    data: {
      name: overrides.name ?? "TypeScript",
      category: overrides.category ?? "Language",
      icon: overrides.icon ?? "typescript-icon",
      userId,
    },
  });
};

export const createProject = async (userId: number, overrides: any = {}) => {
  return prisma.project.create({
    data: {
      title: overrides.title ?? "Portfolio API",
      startDate: overrides.startDate ?? new Date("2024-01-01T00:00:00.000Z"),
      endDate: overrides.endDate ?? null,
      description: overrides.description ?? "Project description",
      userId,
    },
  });
};

export const createEducation = async (userId: number, overrides: any = {}) => {
  return prisma.education.create({
    data: {
      place: overrides.place ?? "University",
      name: overrides.name ?? "Computer Science",
      startDate: overrides.startDate ?? new Date("2020-01-01T00:00:00.000Z"),
      endDate: overrides.endDate ?? null,
      description: overrides.description ?? "Education description",
      userId,
    },
  });
};

export const createSocialLink = async (userId: number, overrides: any = {}) => {
  return prisma.socialLink.create({
    data: {
      name: overrides.name ?? "LinkedIn",
      icon: overrides.icon ?? "linkedin-icon",
      url: overrides.url ?? "https://linkedin.com/in/test",
      userId,
    },
  });
};

export { prisma };
