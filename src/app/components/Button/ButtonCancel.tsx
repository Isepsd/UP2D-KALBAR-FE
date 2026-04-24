import { setCallbackForm } from "@app/store/reducers/ui";
import moment from "moment";
import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

interface IButtonCancel {
  type?: "page" | "modal";
  ids?: string;
  onClick?: any;
  variant?: any;
}

export default function ButtonCancel({
  type = "page",
  ids = "id",
  onClick,
  variant = "",
}: IButtonCancel) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCancel = () => {
    if (onClick) {
      onClick();
    }
    if (type == "page") navigate(-1);
    else {
      if (searchParams.get(ids)) {
        searchParams.delete(ids);
        setSearchParams(searchParams);
      }
      dispatch(setCallbackForm({ time: moment(), getData: false }));
    }
  };

  return (
    <Button
      className="ms-2"
      type="button"
      variant={variant}
      onClick={handleCancel}
    >
      Kembali
    </Button>
  );
}
