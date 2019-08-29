import * as React from "react";
import styled from "styled-components";

import folder from "assets/folder.png";
import { Folder } from "types/api";
import { Button } from "components/Button";
import { Spacing } from "styles/Base";
import { PhotoContext } from "store";

const ButtonWrapper = styled.div`
  margin-bottom: ${Spacing.SMALL};
`;

const FolderButton = styled(Button)`
  width: 300px;
  text-align: auto;
`;

const FolderButtonContent = styled.div`
  display: flex;
  align-items: center;
`;

const FolderIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: ${Spacing.NORMAL};
`;

interface Props {
  folders: Folder[];
  onSelection: (folderId: string) => void;
}

const FolderList: React.FC<Props> = ({ folders, onSelection }) => (
  <>
    {folders.length > 0 && <h1>select folder with photos to map</h1>}
    {folders.map(({ id, name }) => (
      <ButtonWrapper key={id}>
        <FolderButton
          onClick={() => onSelection(id)}
          disabled={React.useContext(PhotoContext).folderId === id}
        >
          <FolderButtonContent>
            <FolderIcon src={folder} alt="folder" />
            {name}
          </FolderButtonContent>
        </FolderButton>
      </ButtonWrapper>
    ))}
  </>
);

export default FolderList;
