import { useEffect, useState } from "react";
import { fetchData } from "../Api";
import styles from "./Employee.module.css";

export const Employee = () => {

    const [employees, setEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const getData = async () => {
            try {
                const employeesData = await fetchData();
                setEmployees(employeesData);
            } catch (error) {
               alert('failed to fetch data', error.message);
            }
        }
        getData();
    }, [])

    const employeesPerPage = 10;
    const totalPages = Math.ceil(employees.length / employeesPerPage);


    //  1,2,3,4,5 <= 5 all true
    const handlePrevious = () => {
        if (currentPage <= totalPages) { // 
            setCurrentPage(currentPage - 1);
        }
    }
    // //  1,2,3,4 < 5 all true
    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    const getEmployeesPerPage = () => {

        const startIndex = (currentPage - 1) * employeesPerPage;
        const lastIndex = currentPage * employeesPerPage;
        return employees.slice(startIndex, lastIndex);
    }
    // currentPage = 1, startIndex = 0, lastIndex = 10, employees.slice(0,10) => 1,2,3.....10
    // currentPage = 2 , startIndex = 10 , lastIndex = 20 , employees.slice(10,20) => 11,12....20


    return (
        <div>
            <div className={styles.heading}><h1>Employee Data Table</h1></div>
            <table className={styles.table}>
                <thead className={styles.columnHeading}>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody >
                    {getEmployeesPerPage().map((employee) => {
                        return (
                            <tr className={styles.row}>
                                <td>{employee.id}</td>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.role}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className={styles.buttonContainer}>
                <button disabled={currentPage === 1} onClick={handlePrevious} className={styles.button}>Previous</button>
                <div className={styles.pageNum}>{currentPage}</div>
                <button disabled={currentPage === totalPages} onClick={handleNext} className={styles.button}>Next</button>
            </div>

        </div>
    )
}