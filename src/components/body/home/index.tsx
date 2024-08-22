import { listen } from "@tauri-apps/api/event";
import React, { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import { Button, Empty, Flex, FloatButton, Menu, Tooltip, Typography } from 'antd'
import styles from './Home.module.scss';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import ccw from '../../../assets/ccw.svg';
import cocrea from '../../../assets/cocrea.svg';
import Plus from '../../../assets/plus.svg';
import Install from '../../../assets/install.svg';
import { Window } from '../../../globals';


// 作为 React 组件使用
const items2: Array<any> = [
  {
    key: `ccw`,
    icon: <img src={ccw} alt="" style={{ width: "20px" }} />,
    label: `共创世界`,
    children: new Array(4).fill(null).map((_, j) => {
      const subKey = 1 * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  },
  {
    key: `cocrea`,
    icon: <img src={cocrea} alt="" style={{ width: "20px" }} />,
    label: `cocrea`,
    children: new Array(4).fill(null).map((_, j) => {
      const subKey = 1 * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  },
];

const handleInstallClick = () => {
  Window.createWindow(
    "install",
    "https://www.ccw.site",
    "../src/null.js",
    "安装"
  );
};

const Home: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [collapsedImpotant, setCollapsedImpotant] = useState(false);
  const [show, setShow] = useState(true);
  listen("goOtherPage", (e) => {
    if (e.payload === "home") {
      setShow(true);
    } else {
      setShow(false);
    }
  });

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 600) {
        setCollapsedImpotant(true);
      } else {
        setCollapsedImpotant(false);
      }
    });
  }, []);

  const description =
    "感谢大家的试玩\n如有bug、建议可以发到评论区\n核心共振讨论区：993746347😘\n个人主页还没做完，目前发出来测试下头像大小有没有问题√";

  if (show) {
    return (

        <Content className={styles.content}>
            <Sider collapsible collapsed={collapsedImpotant ? true : collapsed} onCollapse={(value) => setCollapsed(value)} theme={'light'} className={styles.sider}>
                <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" items={items2} className={styles.menu} />
            </Sider>
            <Flex wrap justify="space-evenly" align="flex-start" gap="middle" className={styles.div}>

                {/* {Array.from({ length: 24 }, (_) => (
                    <ProjectCard
                        coverURL='https://m.ccw.site/works-covers/642b41c4-51a4-449c-82fa-b64d57af2061.png'
                        title='核心共振[联机]'
                        description={description}
                        projectID='65c2e0b226e91810b6112576'
                        authorImg='https://m.ccw.site/avatar/62fdd7337c888254d55c765d/bfdcab7f-4e9e-43b0-b117-ba670c627dd4.jpg'
                    ></ProjectCard>
                ))} */}
                <Empty
                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    imageStyle={{ height: 60 }}
                    description={
                        <Typography.Text>
                            还没有导入作品哦
                        </Typography.Text>
                    }
                >
                    <Button type="primary" onClick={handleInstallClick}>立即导入</Button>
                </Empty>

            </Flex>
            <FloatButton.Group
                trigger="click"
                type="primary"
                style={{ insetInlineEnd: 24 }}
                icon={<img src={Plus} alt="" style={{ width: '18px' }} />}
            >
                <Tooltip placement="left" title="导入游戏">
                    <FloatButton icon={<img src={Install} alt="" style={{ width: '18px' }} onClick={handleInstallClick} />} />
                </Tooltip>
            </FloatButton.Group>
        </Content >

    );
  } else {
    return null;
  }
};

export default Home;
