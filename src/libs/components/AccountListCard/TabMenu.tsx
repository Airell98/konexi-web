import { useEffect, useState, useRef } from "react";
import type { ChangeEvent } from "react";
import {
  Text,
  Box,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  InputGroup,
  Input,
  InputLeftElement,
} from "@chakra-ui/react";
import { ChevronDownIcon, SearchIcon, CheckIcon } from "@chakra-ui/icons";
import { TAccountFile } from "./entitites";

type TTabMenuProps = {
  tabs: TAccountFile["tabs"];
  handleSelectTab: (tabId: string) => void;
};

type TTabMenuState = {
  name: string;
  tabs: TAccountFile["tabs"];
};

export const TabMenu = ({ tabs, handleSelectTab }: TTabMenuProps) => {
  const [state, setState] = useState<TTabMenuState>({
    name: "",
    tabs: tabs,
  });

  const tabMenuRef = useRef(null);

  useEffect(() => {
    if (state.name === "") {
      setState((prevState) => ({
        ...prevState,
        tabs: tabs,
      }));
      return;
    }

    if (state.name !== "") {
      const searchResult = tabs.filter((tab) => tab.name === state.name);

      setState((prevState) => ({
        ...prevState,
        tabs: searchResult,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.name]);

  const getSelectedTabOnEachFile = (currentTabs: TAccountFile["tabs"]) => {
    return tabs.find((tab) => tab.isSelected)?.name ?? "";
  };

  const handleOnChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      name: e.target.value,
    }));
  };

  const handleOnCloseTabMenu = () => {
    setState((prevState) => ({
      ...prevState,
      name: "",
    }));
  };

  return (
    <Menu onClose={handleOnCloseTabMenu} initialFocusRef={tabMenuRef}>
      <MenuButton
        borderRadius="30px"
        as={Button}
        rightIcon={<ChevronDownIcon />}
      >
        <Text color="hazel" fontSize={{ base: "12px", md: "14px" }}>
          {getSelectedTabOnEachFile(tabs)}
        </Text>
      </MenuButton>
      <MenuList w="100px">
        <Box px="6px" mb="6px">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Search"
              value={state.name}
              onChange={handleOnChangeInput}
            />
          </InputGroup>
        </Box>

        {state.tabs.map((tab) => {
          return (
            <MenuItem
              key={tab.id}
              onClick={() => {
                if (!tab.isSelected) {
                  handleSelectTab(tab.id);
                }
              }}
            >
              <HStack w="100%" justifyContent={"space-between"}>
                <Text>{tab.name}</Text>
                {tab.isSelected && (
                  <CheckIcon color="mediumBlue" fontSize={12} />
                )}
              </HStack>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};
