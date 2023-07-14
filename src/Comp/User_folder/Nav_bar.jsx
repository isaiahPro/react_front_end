import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "../Style/Nav_bar.css";
import SearchItem from './searchItem';
import { PhoneListLimit, LaptopListlimit, OtherListLimit } from '../ItemLIsts/AllItemList';

function Nav_bar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [laptops, setLaptops] = useState([]);
  const [phones, setPhones] = useState([]);
  const [otherElectronics, setOthers] = useState([]);

  useEffect(() => {
    async function fetchData01() {
      const data01 = await LaptopListlimit();
      setLaptops(data01);
    }
    fetchData01();
    async function fetchData02() {
      const data02 = await PhoneListLimit();
      setPhones(data02);
    }
    fetchData02();
    async function fetchData03() {
      const data03 = await OtherListLimit();
      setOthers(data03);
    }
    fetchData03();
  }, []);

  const allItems = [...laptops, ...phones, ...otherElectronics];

  const filteredItems = allItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar expand="lg" className="nav_main_container">
        <Container fluid>
          <Navbar.Brand href="#" id="nav_camp_title">
            DAVE ELECTRONICS
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/laptops">laptops</Nav.Link>
              <Nav.Link href="/phones">Phones</Nav.Link>
              <NavDropdown title="Other" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/other/tv">Tvs</NavDropdown.Item>
                <NavDropdown.Item href="/other/speakers">
                  Speakers
                </NavDropdown.Item>
                <NavDropdown.Item href="/other/tvaccesories">
                  Tv Accesories
                </NavDropdown.Item>
                <NavDropdown.Item href="/other/laptopAccesories">
                  laptop Accesories
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
              <Form.Control
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success" type="submit" onClick={() => setSearchQuery('')}>
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {searchQuery !== '' && (
        <ul className="search_list">
          {filteredItems.map((item, index) => (
            <div key={index}>
              <SearchItem name={item.name} price={item.price} id={item.id} type={item.type} />
            </div>
          ))}
        </ul>
      )}
    </>
  );
}

export default Nav_bar;