import { Navbar, Dropdown, Avatar, Button } from "flowbite-react";
import categories from "../../const/categories";
import HoverDropdown from "../UI/HoverDropdown";
import { BsBellFill, BsFillChatDotsFill } from "react-icons/bs";

import styles from "./Header.module.scss";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";

const Header = () => {
  const context = useContext(AuthContext);

  console.log(context.user);

  return (
    <div className="container mx-auto px-4">
      <Navbar fluid={true} rounded={true} className={styles.Header}>
        <div className="flex w-full justify-between pt-2 px-3.5">
          <div className="flex items-center">
            <Navbar.Brand href="/">
              <span className="self-center whitespace-nowrap text-2xl font-semibold text-green-400">
                SwapSpot
              </span>
            </Navbar.Brand>
            <input
              className="ml-5 border border-solid h-9 rounded-lg w-80 px-3 outline-1 caret-green-400 focus-visible:!outline-green-400"
              placeholder="Що шукаєте?"
            />
          </div>
          <div className="flex items-center">
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
                  img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  rounded={true}
                />
              }>
              <Dropdown.Header>
                <span className="block text-sm font-semibold text-teal-900">
                  Іван Іщенко
                </span>
                <span className="block truncate text-sm font-medium">
                  name@flowbite.com
                </span>
              </Dropdown.Header>
              <Dropdown.Item>Мій профіль</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>Бажане</Dropdown.Item>
              <Dropdown.Item>Мої оголошення</Dropdown.Item>
              <Dropdown.Item>Пропозиції</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={context.logout}>Вихід</Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle className="ml-2" />
          </div>
        </div>
        <Navbar.Collapse>
          {Object.keys(categories).map((cat) =>
            !categories[cat].sub_categories ? (
              <Navbar.Link
                key={categories[cat].name}
                className="hover:!text-green-400"
                href={`/search?category=${categories[cat].name}`}>
                {categories[cat].name}
              </Navbar.Link>
            ) : (
              <HoverDropdown
                key={categories[cat].name}
                label={categories[cat].name}
                href={`/search?category=${categories[cat].name}`}>
                {Object.values(categories[cat].sub_categories).map((sub) => (
                  <Navbar.Link
                    key={sub}
                    className="hover:!text-green-400 flex w-full items-center !px-5 !py-2 text-sm hover:bg-gray-100"
                    href={`/search?category=${sub}`}>
                    {sub}
                  </Navbar.Link>
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
