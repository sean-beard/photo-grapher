import * as React from "react";
import styled from "styled-components";

import { Folder } from "../types/api";
import { Button } from "./Button";
import { Spacing } from "../styles/Base";

const ButtonWrapper = styled.div`
  margin-bottom: ${Spacing.SMALL};
`;

const FolderButton = styled(Button)`
  width: 300px;
`;

interface Props {
  folders: Folder[];
  onSelection: (folderId: string) => void;
}

const FolderList: React.SFC<Props> = ({ folders, onSelection }) => (
  <>
    {folders.length > 0 && <h1>select folder with photos to map</h1>}
    {folders.map(({ id, name }) => (
      <ButtonWrapper key={id}>
        <FolderButton onClick={() => onSelection(id)}>{name}</FolderButton>
      </ButtonWrapper>
    ))}
  </>
);

export default FolderList;
