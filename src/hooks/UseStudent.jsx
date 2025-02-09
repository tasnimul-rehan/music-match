import { useEffect, useState } from "react";

const UsePetOwener = (email) => {
  const [isStudent, setIsStudent] = useState(false);
  const [isStudentLoading, setIsStudentLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/user/role/${email}`)
        .then((res) => res.json())
        .then((data) => {
          setIsStudent(data.isStudent);
          setIsStudentLoading(false);
        });
    }
  }, [email]);
  return [isStudent, isStudentLoading];
};

export default UsePetOwener;
