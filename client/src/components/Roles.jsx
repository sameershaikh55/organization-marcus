import React from "react";
import Layout from "../layout";
import Menu from "./Menu";

const Roles = () => {
  return (
    <Layout classname="home_container Admin" title="Roles">
      <div className="roles_container d-flex flex-column gap-5 text-white py-5">
        <div className="d-flex justify-content-end">
          <Menu />
        </div>
        <hr />
        <div>
          <h1>Executives</h1>
          <p className="opacity-75">
            Executives are in charge of their organization. They create and
            review goals for the company. They work closely with a team of
            upper-level staff or assistants. This team may make both long and
            short-range plans to achieve these goals. Once the plans are set,
            executives make sure the company follows the changes. The executives
            is the final approver of all the project and request with the
            authority to decline or reject any project which doesn’t respond to
            the company competencies.
          </p>
        </div>
        <hr />
        <div>
          <h1>Admin</h1>
          <p className="opacity-75">
            An Office Administrator, or Office Manager, completes clerical and
            administrative tasks for an office. Their main duties include
            welcoming and directing visitors, coordinating meetings and
            appointments and performing clerical tasks, like answering phones
            and responding to emails. Additionally, to create profile for new
            users and make necessary follow up for the staffs payroll.
          </p>
        </div>
        <hr />
        <div>
          <h1>ICT</h1>
          <ul>
            <li className="opacity-75">
              Maintain and troubleshoot all network and computer related issues
            </li>
            <li
              className="
              opacity-75
            "
            >
              Integrate security, physical control solutions for all
              confidential data and systems
            </li>
            <li className="opacity-75">
              Monitor performance and manage parameters to provide fast
              responses to front-end users
            </li>
            <li
              className="
              opacity-75
            "
            >
              Integrate and configure computer networking for best performance
            </li>
            <li className="opacity-75">
              Troubleshoot and repair of hardware, operating systems and
              applications
            </li>
            <li
              className="
              opacity-75
            "
            >
              Monitor and maintain computer systems and networks
            </li>
            <li className="opacity-75">
              Identify security gaps and provide relevant solutions in
              consultation with the Operations manager
            </li>
            <li
              className="
              opacity-75
            "
            >
              Test and evaluate all new technology including M&amp;E systems
              e.g. database systems, websites etc.
            </li>
            <li className="opacity-75">
              Conduct electrical safety checks on computer equipment
            </li>
            <li
              className="
              opacity-75
            "
            >
              Enhance office IT system through appropriate upgrades and advise
              Operations Unit on changes or improvements required
            </li>
            <li className="opacity-75">
              Help install and support of all ICT hardware and software
            </li>
            <li
              className="
              opacity-75
            "
            >
              Enable the profile created by the admin
            </li>
            <li className="opacity-75">
              Reset the password of the user account for security issue
            </li>
            <li
              className="
              opacity-75
            "
            >
              Change the employee role if necessary
            </li>
          </ul>
        </div>
        <hr />
        <div>
          <h1>Logistic</h1>
          <p className="opacity-75">
            A logistics staff works with a logistics company or in the logistics
            unit of an organization. They are responsible for supporting the
            co-ordination, planning, and execution, and monitoring of supply
            chain operations in an organization. Their role may entail working
            in the area of shipping and performing receiving functions, or they
            may be involved in providing support to the logistics manager in all
            aspects of warehouse operations.
          </p>
          <p className="opacity-75">
            The logistics staff job description may entail providing support to
            the logistics team in line with the departmental targets. It may
            also involve making certain that all out-going and incoming
            shipments are undamaged and accurate.
          </p>
          <p className="opacity-75">
            The logistics staff may also be responsible for documentations,
            including preparing paper works for outbound shipments, and
            reviewing shipment documents such as BOL, invoices, and packing
            lists, as well as maintaining inventory of shipping supplies. They
            are also responsible for providing customers with order
            confirmations and booking outbound order with freight forwarders or
            brokers.
          </p>
          <p className="opacity-75">
            They work with shipping vendors where their duties involve
            coordinating returns of merchandise and managing electronic shipping
            files. The logistics staff work description also involves processing
            incoming shipments and receiving incoming materials. In carrying out
            shipment processing tasks, logistics staff compare what has been
            received with the shipment order, ascertain that the materials are
            in good condition, and stock them in the warehouse, and file all
            necessary documentation.
          </p>
          <p className="opacity-75">
            They are also responsible for processing outbound shipments, which
            involves several duties, including order confirmation and
            preparation of packing lists to physically check outgoing materials.
          </p>
        </div>
        <hr />
        <div>
          <h2>Employees</h2>
          <ul>
            <li className="opacity-75">Dealing honestly with the employer.</li>
            <li
              className="
              opacity-75
            "
            >
              Working with reasonable care and skill.
            </li>
            <li className="opacity-75">
              Not disclosing information to others.
            </li>
            <li
              className="
              opacity-75
            "
            >
              Disclosing any possible conflict of interest.
            </li>
            <li className="opacity-75">
              Caring for the employer's property, equipment, and facilities.
            </li>
            <li
              className="
              opacity-75
            "
            >
              Complying with safety rules, including OSHA standards, rules,
              regulations, and orders.
            </li>
            <li className="opacity-75">
              Create new project to submit to the executive for approval.
            </li>
            <li
              className="
              opacity-75
            "
            >
              Make necessarily follow up on the on-going project to make that
              all projects are done effectively.
            </li>
          </ul>
        </div>
        <hr />
        <div>
          <h3>About us</h3>
          <p className="opacity-75">
            Marcus SA is a Construction company of conducting engineering works,
            i.e., erecting buildings and other built physical infrastructure
            like roads and bridges. The company’ offerings differ based on
            expertise; some focus on industrial infrastructure, residentials,
            and water structures, among others.
          </p>
          <p className="opacity-75">
            Surely, Marcus SA will enjoy building your construction in any place
            in the World because of the partnership with other construction
            companies all over the world.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Roles;
