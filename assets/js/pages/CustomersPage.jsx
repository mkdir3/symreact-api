import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import CustomersAPI from "../services/CustomersAPI";
import { Link } from "react-router-dom";

const CustomerPage = () => {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    CustomersAPI.findAll()
      .then((data) => setCustomers(data))
      .catch((error) => console.log(error.response));
  }, []);

  const handleDelete = (id) => {
    // store current customers
    const originalCustomers = [...customers];

    // filter customers without the deleted one
    setCustomers(customers.filter((customer) => customer.id !== id));

    CustomersAPI.delete(id)
      .then((response) => console.log("ok"))
      .catch((error) => {
        // if error during deleting, set customers back to the original one
        setCustomers(originalCustomers);
        console.log(error.response);
      });
  };

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = ({ currentTarget }) => {
    setSearch(currentTarget.value);
    setCurrentPage(1);
  };

  const itemsPerPage = 10;
  const filteredCustomers = customers.filter(
    (c) =>
      c.firstName.toLowerCase().includes(search.toLowerCase()) ||
      c.lastName.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      (c.company && c.company.toLowerCase().includes(search.toLowerCase()))
  );
  const paginatedCustomers = Pagination.getData(
    filteredCustomers,
    currentPage,
    itemsPerPage
  );

  return (
    <>
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <h1>Liste des clients</h1>
        <Link to="/customer/new" className="btn btn-primary">
          Créer un client
        </Link>
      </div>
      <div className="mt-5 p-3">
        <div className="form-group pt-4 pb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Rechercher"
            onChange={handleSearch}
            value={search}
          />
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Client</th>
              <th>Email</th>
              <th>Entreprise</th>
              <th className="text-center">Factures</th>
              <th className="text-center">Montant Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCustomers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>
                  {customer.firstName} {customer.lastName}
                </td>
                <td>{customer.email}</td>
                <td>{customer.company}</td>
                <td className="text-center">{customer.invoices.length}</td>
                <td className="text-center">
                  {customer.totalAmount.toLocaleString()} €
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(customer.id)}
                    disabled={customer.invoices.length > 0}
                    className="btn btn-sm btn-outline-danger"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {itemsPerPage < filteredCustomers.length && (
          <Pagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            length={filteredCustomers.length}
            handlePagination={handlePagination}
          />
        )}
      </div>
    </>
  );
};

export default CustomerPage;
