import React, { FC } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import styled from 'styled-components';

const Ul = styled.ul`
  display: flex;
  padding: 0;
  margin: 0;
`;
const Li = styled.li`
  position: relative;
  list-style: none;
  :not(:last-child) {
    margin-right: -0.8rem;
  }
`;
const Avatar = styled.img`
  width: 40px;
  height: 40px;
  -o-object-fit: cover;
  object-fit: cover;
  border-radius: 50% !important;
  border: 2px solid #fff;
`;
const TextMore = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50% !important;
  background-color: var(--white);
  text-align: center;
  line-height: 40px;
  color: var(--black-500);
  border: 1px solid var(--black-100);
`;

type Props = {
  data: any[];
};

const ListAvatarGroup: FC<Props> = ({ data }) => {
  const moreLength = data?.length - 4
  return (
    <Ul>
      {data.map((item: any, index: number) => {
        if (index < 4) {
          return (
            <>
              <OverlayTrigger
                placement='top'
                delay={{ show: 50, hide: 100 }}
                overlay={
                  <Tooltip id='button-tooltip'>{item.fullname}</Tooltip>
                }
              >
                <Li key={index}>
                  <Avatar src={item.avatar} />
                </Li>
              </OverlayTrigger>
            </>
          );
        }
      })}
      {data.length > 4 && (
        <Li>
          <TextMore>
            +{moreLength}
          </TextMore>
        </Li>
      )}
    </Ul>
  );
};

export default ListAvatarGroup;
