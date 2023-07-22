import { useState } from "react";

type TTabs = {
  id: string;
  isSelected: boolean;
  name: string;
};

type TSheets = {
  id: string;
  name: string;
  tabs: Array<TTabs>;
};

type TGoogleAccount = {
  id: string;
  name: string;
  files: Array<TSheets>;

  lastExported?: Date;
};

type TCommonBlock = {
  type: "google-signin" | "import";
};

type TAccountListBlock = {
  type: "account-list";
  googleAccounts: Array<TGoogleAccount>;
};

export type TCardBlock = TAccountListBlock | TCommonBlock;

export type TMockDataId = "C-1" | "C-2" | "C-3";

type TMockData = {
  [key in TMockDataId]: TCardBlock;
};

const MOCK_TABS: Array<TTabs> = [
  {
    id: "T-1",
    name: "Tab 1",
    isSelected: true,
  },
  {
    id: "T-2",
    name: "Tab 2",
    isSelected: false,
  },
  {
    id: "T-3",
    name: "Tab 3",
    isSelected: false,
  },
];

const MOCK_SHEETS: Array<TSheets> = [
  {
    id: "S-1",
    name: "sheet 1",
    tabs: JSON.parse(JSON.stringify(MOCK_TABS)), // Avoid array pass by reference
  },
  {
    id: "S-2",
    name: "sheet 2",
    tabs: JSON.parse(JSON.stringify(MOCK_TABS)), // Avoid array pass by reference
  },
];

const MOCK_DATA: TMockData = {
  "C-1": {
    type: "google-signin",
  },
  "C-2": {
    type: "import",
  },
  "C-3": {
    type: "account-list",
    googleAccounts: [
      {
        id: "G-1",
        name: "Anthony",
        files: JSON.parse(JSON.stringify(MOCK_SHEETS)), // Avoid array pass by reference
      },
      {
        id: "G-2",
        name: "Bernard",
        files: JSON.parse(JSON.stringify(MOCK_SHEETS)), // Avoid array pass by reference
      },
    ],
  },
};

export const useDataManagement = () => {
  const [data, setData] = useState({ ...MOCK_DATA });

  const handleDeleteBlockCard = (id: TMockDataId) => {
    const tempData = { ...data };

    delete tempData[id];

    setData((_) => tempData);
  };

  const handleRemoveSheetFromSingleAccount = (
    sheetIndex: number,
    accountId: string
  ) => {
    const tempGoogleAccount = [
      ...(data["C-3"] as TAccountListBlock)["googleAccounts"],
    ];

    const currentAccount = tempGoogleAccount.find(
      (value) => value.id === accountId
    );

    if (currentAccount) {
      const filteredFiles = currentAccount.files.filter(
        (file, index) => index !== sheetIndex
      );

      tempGoogleAccount.forEach((account, index) => {
        if (account.id === accountId) {
          account.files = filteredFiles;
        }
      });

      setData((prevData) => ({
        ...prevData,
        "C-3": {
          ...prevData["C-3"],
          googleAccounts: tempGoogleAccount,
        },
      }));
    }
  };

  const handleExportFile = (accountId: string) => {
    const tempGoogleAccount = [
      ...(data["C-3"] as TAccountListBlock)["googleAccounts"],
    ];

    const currentAccount = tempGoogleAccount.find(
      (value) => value.id === accountId
    );

    if (!currentAccount) return;

    currentAccount.lastExported = new Date();

    setData((prevData) => ({
      ...prevData,
      "C-3": {
        ...prevData["C-3"],
        googleAccounts: tempGoogleAccount,
      },
    }));
  };

  const handleSelectTab = (
    accountId: string,
    sheetId: string,
    tabId: string
  ) => {
    const tempGoogleAccount = [
      ...(data["C-3"] as TAccountListBlock)["googleAccounts"],
    ];

    const currentAccount = tempGoogleAccount.find(
      (value) => value.id === accountId
    );

    if (!currentAccount) return;

    const currentFiles = currentAccount.files.find(
      (file) => file.id === sheetId
    );

    if (!currentFiles) return;

    currentFiles.tabs.forEach((tab) => {
      if (tab.isSelected) {
        tab.isSelected = false;
      }

      if (tab.id === tabId) {
        tab.isSelected = true;
      }
    });

    setData((prevData) => ({
      ...prevData,
      "C-3": {
        ...prevData["C-3"],
        googleAccounts: tempGoogleAccount,
      },
    }));
  };

  const handleAddNewGoogleAccount = (name: string) => {
    const tempGoogleAccount = [
      ...(data["C-3"] as TAccountListBlock)["googleAccounts"],
    ];

    setData((prevData) => ({
      ...prevData,
      "C-3": {
        ...prevData["C-3"],
        googleAccounts: [
          ...tempGoogleAccount,
          {
            id: `G-${tempGoogleAccount.length + 1}`,
            name: name,
            files: [...MOCK_SHEETS],
          },
        ],
      },
    }));
  };

  return {
    data,
    handleDeleteBlockCard,
    handleAddNewGoogleAccount,
    handleRemoveSheetFromSingleAccount,
    handleSelectTab,
    handleExportFile,
  };
};
