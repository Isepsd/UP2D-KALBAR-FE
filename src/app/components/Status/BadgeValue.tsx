import React, { useEffect, useState } from 'react';
import { Badge } from 'react-bootstrap';

export default function BadgeValue({ text = '' }: IBadgeValue) {
  const [variant, setVariant] = useState<string>()

  useEffect(() => {
    let varian = "";
    switch (text) {
      case "remote disturbe":
      case "open disturbe":
      case "local disturbe":
      case "close disturbe":
        varian = "warning";
        break;
      case "up":
      case "open":
        varian = "success";
        break;
      case "remote":
        varian = "info";
        break;
      case "local":
        varian = "primary";
        break;
      case "close":
        varian = "danger";
        break;
      case "down":
        varian = "danger";
        break;
      default:
        break;
    }

    setVariant(varian)
  }, [text])

  return (
    <Badge bg={variant} className={`${variant ? "text-white" : ""} `}>
      {text}
    </Badge>
  );
}

interface IBadgeValue {

  text: string
}
