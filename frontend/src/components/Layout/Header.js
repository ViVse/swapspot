import { Navbar, Dropdown, Avatar, Button } from "flowbite-react";
import categories from "../../const/categories";
import HoverDropdown from "../UI/HoverDropdown";
import { BsBellFill, BsFillChatDotsFill } from "react-icons/bs";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import { Link } from "react-router-dom";

import styles from "./Header.module.scss";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="container mx-auto px-4">
      <Navbar fluid={true} rounded={true} className={styles.Header}>
        <div className="flex w-full justify-between pt-2 px-3.5">
          <div className="flex items-center">
            <Link to="/">
              <span className="self-center whitespace-nowrap text-2xl font-semibold text-green-400">
                SwapSpot
              </span>
            </Link>
            <input
              className="ml-5 border border-solid h-9 rounded-lg w-80 px-3 outline-1 caret-green-400 focus-visible:!outline-green-400"
              placeholder="Що шукаєте?"
            />
          </div>
          <div className="flex items-center list-none">
            {!user && (
              <>
                <Link
                  to="login"
                  className="!pr-2 text-green-600 font-medium hover:!text-teal-900">
                  Вхід
                </Link>
                <Link
                  to="signup"
                  className="!border-s-2 border-solid border-teal-900 !pl-2 text-teal-600 font-medium hover:!text-teal-900">
                  Реєстрація
                </Link>
              </>
            )}
            {user && (
              <>
                <Button className="bg-teal-900 font-medium hover:bg-teal-700 mr-4">
                  Додати оголошення
                </Button>
                <div className="relative mr-4">
                  <BsBellFill className="fill-teal-900 w-7 h-7" />
                  <span className={styles.badge}>1</span>
                </div>
                <div className="relative mr-4">
                  <BsFillChatDotsFill className="fill-teal-900 w-7 h-7" />
                  <span className={styles.badge}>1</span>
                </div>
                <Dropdown
                  arrowIcon={false}
                  inline={true}
                  label={
                    <Avatar
                      alt="User settings"
                      img={
                        user.avatar
                          ? user.avatar.publicUrl
                          : "https://cdn4.iconfinder.com/data/icons/evil-icons-user-interface/64/avatar-512.png"
                      }
                      rounded={true}
                    />
                  }>
                  <Dropdown.Header>
                    <span className="block text-sm font-semibold text-teal-900">
                      {user.name}
                    </span>
                    <span className="block truncate text-sm font-medium">
                      {user.email}
                    </span>
                  </Dropdown.Header>
                  <Dropdown.Item>Мій профіль</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item>Бажане</Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="my-products">Мої оголошення</Link>
                  </Dropdown.Item>
                  <Dropdown.Item>Пропозиції</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={logout}>Вихід</Dropdown.Item>
                </Dropdown>
              </>
            )}
            <Navbar.Toggle className="ml-2" />
          </div>
        </div>
        <Navbar.Collapse>
          {Object.keys(categories).map((cat) =>
            !categories[cat].sub_categories ? (
              <Link
                key={categories[cat].name}
                className="hover:!text-green-400"
                to={`/search?category=${categories[cat].name}`}>
                {categories[cat].name}
              </Link>
            ) : (
              <HoverDropdown
                key={categories[cat].name}
                label={categories[cat].name}
                to={`/search?category=${categories[cat].name}`}>
                {Object.values(categories[cat].sub_categories).map((sub) => (
                  <Link
                    key={sub}
                    className="hover:!text-green-400 flex w-full items-center !px-5 !py-2 text-sm hover:bg-gray-100"
                    to={`/search?category=${sub}`}>
                    {sub}
                  </Link>
                ))}
              </HoverDropdown>
            )
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
