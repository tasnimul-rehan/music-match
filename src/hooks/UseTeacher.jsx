import { useEffect, useState } from "react";

const UsePetOwener = (email) => {
  const [isTeacher, setIsTeacher] = useState(false);
  const [isTeacherLoading, setIsTeacherLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/user/role/${email}`)
        .then((res) => res.json())
        .then((data) => {
          setIsTeacher(data.isTeacher);
          setIsTeacherLoading(false);
        });
    }
  }, [email]);
  return [isTeacher, isTeacherLoading];
};

export default UsePetOwener;
