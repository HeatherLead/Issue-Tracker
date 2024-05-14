import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client/wasm";
import IssueActions from "./issueActions";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

interface props {
  searchParams: IssueQuery;
}
const page = async ({ searchParams }: props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where = { status };
  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const issues = await prisma.issue.findMany({
    where,
    orderBy: orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({
    where,
  });

  return (
    <Flex direction="column" gap="5">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />

      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </Flex>
  );
};

export default page;

export const metadata: Metadata = {
  title: "Issue Tracker - Issues",
  description: "View All the Listed Issues of project.",
};
