import React, {ReactNode, useState, useRef} from "react";
import Link from "next/link";

interface MenuItem {
    name: string
    linkPath?: string
}

interface NavigationBarMenuProps{
    menuName: string
    listOfMenuItems: MenuItem[];
}


// FIXME: The Menu does not appear on the first hoover, you have to click for the first time and then the hoover
//  functionality will work.
const NavigationBarMenu: React.FunctionComponent<NavigationBarMenuProps> = ( { menuName, listOfMenuItems }: NavigationBarMenuProps) => {
    // State hook for managing the dropdown open/close
    const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
    // Timeout for dropdown visibility
    const dropdownTimeoutId = useRef<NodeJS.Timeout | null>(null)
    // Ref for the menu container to track its DOM element (Also tells TypeScript the type of object menuRef.current
    const menuRef = useRef<HTMLDetailsElement>(null);

    // Event handler for clicking the dropdown toggle button
    const toggleDropdown = (isVisible: boolean) => {
        if (dropdownTimeoutId.current != null) {
            clearTimeout(dropdownTimeoutId.current)
        }

        if(isVisible) {
            setIsDropdownVisible(true);
        } else {
            // Set delay before hiding the dropdown
            dropdownTimeoutId.current = setTimeout(() => {
                setIsDropdownVisible(false);
            }, 1000) // Timeout for 1 seconds (1000 milliseconds)
        }
    }

    return (
        <>
            <details
              // Attach ref to the list item
              ref={menuRef}
              onMouseEnter={() => {
                  toggleDropdown(true)
              }}
              onMouseLeave={() => {
                  toggleDropdown(false)
              }}
              tabIndex={0} // Make it focusable
            >
              <summary>
                  {menuName}
              </summary>
                {isDropdownVisible && (
              <ul
                  className="p-2 bg-base-100 rounded-t-none"
              >
                  {listOfMenuItems.map((menuItem: MenuItem): ReactNode => {
                      return(
                          <li
                              key={menuItem.name}
                          >
                              <Link
                                  href={!menuItem.linkPath ? "/" : menuItem.linkPath}
                              >
                                  {menuItem.name ? menuItem.name : ""}
                              </Link>
                          </li>
                      )
                  })}
              </ul>
                    )}
            </details>
        </>
    )
}

export default NavigationBarMenu;