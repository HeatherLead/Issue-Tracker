import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
interface props {
  Open: number;
  InProgress: number;
  Closed: number;
}
const IssueSummary = ({ Open, InProgress, Closed }: props) => {
  const containers: { label: string; value: number; status: Status }[] = [
    { label: "Open Issues", value: Open, status: "OPEN" },
    { label: "In Progress Issues", value: InProgress, status: "IN_PROGRESS" },
    { label: "Closed Issues", value: Closed, status: "CLOSED" },
  ];
  return (
    <Flex gap="5">
      {containers.map((container) => (
        <Card key={container.label}>
          <Flex direction="column" gap="1">
            <Link
              className=" text-md font-medium"
              href={`/issues/list?status=${container.status}`}
            >
              {container.label}
            </Link>
            <Text size="5" className=" font-bold text-xl">
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
