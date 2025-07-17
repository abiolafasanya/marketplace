"use client";

import useEmailLogs from "./hooks/useEmailLog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function EmailLogPage() {
  const { logs, meta, setPage, isLoading } = useEmailLogs();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Email Logs</h2>

      {isLoading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log._id}>
                  <TableCell>{log.to}</TableCell>
                  <TableCell>{log.type}</TableCell>
                  <TableCell>{log.status}</TableCell>
                  <TableCell>{log.subject}</TableCell>
                  <TableCell>
                    {new Date(log.createdAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between mt-4">
            <Button
              onClick={() => setPage(Number(meta?.currentPage) - 1)}
              disabled={Number(meta?.currentPage) === 1}
            >
              <ArrowLeft /> Previous
            </Button>
            <span className="text-sm">
              Page {Number(meta?.currentPage)} of {meta?.totalPages}
            </span>
            <Button
              onClick={() => setPage(Number(meta?.currentPage) + 1)}
              disabled={Number(meta?.currentPage) >= Number(meta?.totalPages)}
            >
              Next <ArrowRight />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
