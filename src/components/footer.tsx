import { createStyles, Container, Group, ActionIcon, Button } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons';
import { useLocation } from 'react-router-dom';
import { IconLogout } from "@tabler/icons";
import { ExitButtonContext } from '../contexts/ExitButtonContext';
import { useContext } from 'react';

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: "5%",
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },



  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  exitButton: {
    marginLeft: '2px',
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      marginTop: theme.spacing.md,
    },
  },
}));




const handleBackButtonClick = () => {
  window.location.href = "https://remix-personal-website-six.vercel.app/projects";
};

export function Footer() {
  const { classes } = useStyles();
  const location = useLocation();
  const { showExitButton } = useContext(ExitButtonContext);

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <div>
          <p>The Secure Concept App</p>
        </div>
        <div>
        {showExitButton && (
          <Button className={classes.exitButton} onClick={handleBackButtonClick}>
            <IconLogout size={16} />
          </Button>
        )}
        </div>
        <Group spacing={0} className={classes.links} position="right" noWrap>
          <ActionIcon size="lg">
            <IconBrandTwitter size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg">
            <IconBrandYoutube size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg">
            <IconBrandInstagram size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}
