import React from 'react';
import { SectionCards } from '@shadcn/components/section-cards';
import { ChartAreaInteractive } from '@shadcn/components/chart-area-interactive';
import { DataTable } from '@shadcn/components/data-table';
import data from './data.json';

const Dashboard = () => {
  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        {/* <SectionCards /> */}
        <div className="px-4 lg:px-6">
          {/* <ChartAreaInteractive /> */}
        </div>
        <DataTable data={data} />
      </div>
    </div>
  );
};

export default Dashboard;
