import React from "react";
import { Card } from "react-bootstrap";
import styled from "styled-components";
import PerfectScrollbar from "react-perfect-scrollbar";

interface ICardWidget {
  title?: string;
  className?: string;
  classNameBody?: string;
  children?: any;
  height?: any;
  isScroll?: boolean;
}
export default function CardWidget({
  children,
  title,
  className,
  classNameBody = "",
  height = "",
  isScroll = false,
}: ICardWidget) {
  return (
    <Card className={className}>
      {title && (
        <CardHeader>
          <i className="fa-solid fa-layer-group"></i>
          <strong> {title}</strong>
        </CardHeader>
      )}

      {isScroll ? (
        <PerfectScrollbar className="mb-3" style={{ height: "100%" }}>
          <Card.Body className={`${classNameBody}`} style={{ height: height }}>
            {children}
          </Card.Body>
        </PerfectScrollbar>
      ) : (
        <Card.Body
          className={classNameBody}
          style={{ height: height, padding: "0" }}
        >
          {children}
        </Card.Body>
      )}
    </Card>
  );
}

const CardHeader = styled(Card.Header)`
  background: transparent;
  font-size: 1.15rem;
  padding: 0.65rem 1rem;
`;
