import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Card, Flex, Grid, Heading, Text, Box, Button } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import DeleteIssuePage from "./DeleteIssuePage";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";
import { title } from "process";
interface props {
  params: { id: string };
}
const IssueDetailPage = async ({ params }: props) => {
  const session = await getServerSession(authOptions);
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) {
    notFound();
  }
  return (
    <Grid gapX="5" gapY="5" columns={{ initial: "1", sm: "5" }}>
      <Box className=" md:col-span-4">
        <Heading>{issue.title}</Heading>
        <Flex my="2" gap="3">
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="prose max-w-full text-white " mt="4">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </Box>
      {session && (
        <Flex direction="column" gap="4">
          <AssigneeSelect issue={issue} />
          <Button>
            <Pencil2Icon />
            <Link href={`/issues/edit/${issue.id}`}>Edit Issue</Link>
          </Button>
          <DeleteIssuePage issueId={issue.id} />
        </Flex>
      )}
    </Grid>
  );
};
export default IssueDetailPage;

export async function generateMetadata({ params }: props) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  return {
    title: issue?.title,
    description: "details of " + issue?.title,
  };
}
