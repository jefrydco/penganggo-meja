import React, { useEffect, useMemo, useState } from "react";
import HomeStyle from "@/components/pages/Home/Home.module.css";
import { useUser } from "@/hooks/user/user";
import DataTable, { SortOrder, TableColumn } from "react-data-table-component";
import { GenderEnum, IUser } from "@/interfaces/user";
import produce from "immer";
import { format } from "date-fns";
import { Box, Grid, Paper, Select, useMediaQuery } from "@mui/material";
import { Gender } from "@/components/molecules/Gender";
import { mutate } from "swr";
import { Reset } from "@/components/molecules/Reset/Reset";
import { Search } from "@/components/molecules/Search";

export interface HomeProps {}

const columns: TableColumn<IUser>[] = [
  {
    name: "Username",
    selector: (row) => row.login.username,
    sortable: true,
    sortField: "username",
  },
  {
    name: "Name",
    selector: (row) => `${row.name.title} ${row.name.first} ${row.name.last}`,
    sortable: true,
    sortField: "name",
  },
  {
    name: "Email",
    selector: (row) => row.email,
    sortable: true,
    sortField: "email",
  },
  {
    name: "Gender",
    selector: (row) => row.gender,
    sortable: true,
    sortField: "gender",
  },
  {
    name: "Registered Date",
    selector: (row) => format(new Date("2009-09-29T20:09:01.651Z"), "PPpp"),
    sortable: true,
    sortField: "registeredDate",
  },
];

export const Home: React.FC<HomeProps> = () => {
  const matched = useMediaQuery("(max-width: 900px)");
  const [queryString, setQueryString] = useState<Record<string, string>>({});
  const [isReset, setReset] = useState<boolean>(false)
  const { users, refetch } = useUser(queryString);
  useEffect(() => {
    console.log(users)
  }, [users])

  const boxStyle = useMemo(() => (matched
    ? {
        display: "grid",
        gridTemplateRows: "repeat(3, 1fr)",
        gridTemplateColumn: "1fr",
        gridRowGap: "1rem",
      }
    : {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "1fr",
        gridColumnGap: "1rem",
      }), [matched])

  const mutateQueryString = (
    fields: { key: string; value: string }[]
  ) => {
    setQueryString((oldQueryString) =>
      produce(oldQueryString, (draftOldQueryString) => {
        fields.forEach((field) => {
          draftOldQueryString[field.key] = field.value;
        });
      })
    );
  };

  const handleSort: (
    selectedColumn: TableColumn<IUser>,
    sortDirection: SortOrder
  ) => void = (selectedColumn, sortDirection) => {
    if (selectedColumn.sortField && sortDirection) {
      mutateQueryString([
        { key: "sortBy", value: selectedColumn.sortField! },
        { key: "sortOrder", value: sortDirection },
      ]);
    }
  };

  const handleKeywordChange: (keyword: string) => void = (keyword) => {
    if (keyword) {
      mutateQueryString([{ key: "keyword", value: keyword }]);
    }
  };

  const handleGenderChange: (gender: GenderEnum) => void = (gender) => {
    if (gender) {
      mutateQueryString([{ key: "gender", value: gender }]);
    }
  };

  const handleClickReset = () => {
    setQueryString({});
    setReset(true)
    setTimeout(() => {
      setReset(false) 
    });
  };

  return (
    <Paper sx={{ padding: "1rem", borderRadius: 0, minHeight: "100vh" }}>
      <Box
        sx={{
          marginBottom: "1rem",
          ...boxStyle,
        }}
      >
        <Search reset={isReset} onKeywordChange={handleKeywordChange} />
        <Gender reset={isReset} onGenderChange={handleGenderChange} />
        <Reset onClick={handleClickReset} />
      </Box>
      <DataTable
        columns={columns}
        data={users}
        onSort={handleSort}
        sortServer
        keyField="email"
        theme="dark"
      />
    </Paper>
  );
};
