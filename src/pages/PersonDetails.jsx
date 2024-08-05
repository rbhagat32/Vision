import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { asyncGetPerson, removePerson } from "../store/actions/PersonActions";

export default function PersonDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const person = useSelector((state) => state.PersonReducer.person);

  if (person?.details?.name || person?.details?.original_name) {
    document.title =
      `Person - ${person?.details?.name || person?.details?.original_name}` ||
      "Person";
  }

  useEffect(() => {
    setLoading(true);
    dispatch(asyncGetPerson(id)).finally(() => {
      setLoading(false);
    });

    return () => {
      dispatch(removePerson());
    };
  }, []);

  return <div>PersonDetails</div>;
}
