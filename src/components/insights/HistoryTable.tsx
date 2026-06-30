import React, { useState } from 'react';
import { Task } from '../../firebase/firestore';
import { ArrowUpDown, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface HistoryTableProps {
  tasks: Task[];
}

type SortField = 'title' | 'deadlineTimestamp' | 'completionPct' | 'status';
type SortDirection = 'asc' | 'desc';

export function HistoryTable({ tasks }: HistoryTableProps) {
  const [sortField, setSortField] = useState<SortField>('deadlineTimestamp');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  // Filter tasks to last 30
  const historyTasks = [...tasks];

  // Handle Sort Toggle
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getSortedTasks = () => {
    return historyTasks.sort((a, b) => {
      let aVal: any = a[sortField];
      let bVal: any = b[sortField];

      // Handle simple string/number comparisons
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    }).slice(0, 30);
  };

  const formatDeadline = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString([], {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const getStatusPill = (status: Task['status']) => {
    const map = {
      done: 'bg-success-light text-success border-success/20',
      active: 'bg-primary-light text-primary border-primary/20',
      blocked: 'bg-danger-light text-danger border-danger/20',
      extended: 'bg-warning-light text-warning border-warning/20'
    };
    return (
      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border border-0.5 ${map[status] || map.active}`}>
        {status}
      </span>
    );
  };

  const sortedList = getSortedTasks();

  return (
    <div className="card-style bg-white border-0.5 overflow-hidden flex flex-col">
      <div className="pb-2 border-b border-border border-0.5 mb-3">
        <h3 className="text-sm font-bold text-text-primary">Task Logs (Last 30 Tasks)</h3>
        <p className="text-[11px] text-text-secondary">Click headers to sort records.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-xs text-left">
          <thead>
            <tr className="bg-surface-alt border-b border-border border-0.5 text-text-secondary font-semibold">
              <th
                onClick={() => handleSort('title')}
                className="p-3 cursor-pointer hover:bg-black/5 hover:text-text-primary transition-colors rounded-tl-xl select-none"
              >
                <div className="flex items-center space-x-1">
                  <span>Task Name</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('deadlineTimestamp')}
                className="p-3 cursor-pointer hover:bg-black/5 hover:text-text-primary transition-colors select-none"
              >
                <div className="flex items-center space-x-1">
                  <span>Deadline</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('completionPct')}
                className="p-3 cursor-pointer hover:bg-black/5 hover:text-text-primary transition-colors select-none"
              >
                <div className="flex items-center space-x-1">
                  <span>Completion %</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="p-3 select-none">On time?</th>
              <th
                onClick={() => handleSort('status')}
                className="p-3 cursor-pointer hover:bg-black/5 hover:text-text-primary transition-colors rounded-tr-xl select-none"
              >
                <div className="flex items-center space-x-1">
                  <span>Status</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedList.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-text-muted">
                  No tasks recorded in history.
                </td>
              </tr>
            ) : (
              sortedList.map((task) => {
                const isOverdueFired = task.warningsFired?.includes('deadline');
                const onTime = task.status === 'done' && !isOverdueFired;

                return (
                  <tr key={task.id} className="border-b border-border border-0.5 hover:bg-surface-alt/50 transition-colors">
                    <td className="p-3 font-semibold text-text-primary max-w-[150px] truncate" title={task.title}>
                      {task.title}
                    </td>
                    <td className="p-3 text-text-secondary">{formatDeadline(task.deadlineTimestamp)}</td>
                    <td className="p-3 font-bold text-text-primary">{task.completionPct}%</td>
                    <td className="p-3">
                      {task.status === 'done' ? (
                        onTime ? (
                          <span className="text-success font-semibold flex items-center space-x-1">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            <span>Yes</span>
                          </span>
                        ) : (
                          <span className="text-danger font-semibold flex items-center space-x-1">
                            <ShieldAlert className="h-3.5 w-3.5" />
                            <span>Late</span>
                          </span>
                        )
                      ) : isOverdueFired ? (
                        <span className="text-danger font-semibold">Overdue</span>
                      ) : (
                        <span className="text-text-muted">Pending</span>
                      )}
                    </td>
                    <td className="p-3">{getStatusPill(task.status)}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default HistoryTable;
