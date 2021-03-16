import React, { memo } from 'react';
import { Button, Dropdown, Menu } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';

const LanguageDropdown: React.FC = () => {
  const router = useRouter();
  const { locale, pathname, query } = router;

  return (
    <Dropdown
      overlay={() => (
        <Menu>
          <Menu.Item>
            <Link href={{ pathname, query }} locale="ja">
              <a>JA</a>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link href={{ pathname, query }} locale="en">
              <a>EN</a>
            </Link>
          </Menu.Item>
        </Menu>
      )}
      placement="bottomCenter"
    >
      <Button>{locale.toUpperCase()}</Button>
    </Dropdown>
  );
};

export default memo(LanguageDropdown);
