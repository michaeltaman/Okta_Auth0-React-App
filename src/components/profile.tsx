import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "./Loading";
import { createStyles, Avatar, Text, Group } from '@mantine/core';
import { IconAt } from '@tabler/icons';
import { IconUser } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
  },

  container : {
    display:"flex",
    justifyContent:"center"
  },
  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

const Profile = () => {
    const { classes } = useStyles();
    const { user } = useAuth0();

    // Extract the provider and user ID from the 'sub' property
    const [provider] = user.sub.split('|');

    // Construct the profile link based on the provider
    const profileLink = provider === 'github'
        ? `https://github.com/${user.nickname}?tab=repositories`
        : provider === 'linkedin'
        ? `https://www.linkedin.com/feed/?trk=404_page`
        : '#';

    return(
        <div className={classes.container}>
        <Group noWrap>
          <Avatar src={user.picture} size={94} radius="md" />
          <div>
            <Text size="xs" sx={{ textTransform: 'uppercase' }} weight={700} color="dimmed">
              {user.name}
            </Text>

            <Text size="lg" weight={500} className={classes.name}>
              {user.nickname}
            </Text>

            {
              user.email ? (
                <Group noWrap spacing={15} mt={3}>
                  <IconAt stroke={1.5} size={16} className={classes.icon} />
                  <Text size="xs" color="dimmed">
                    {user.email}
                  </Text>
                </Group>
              ) : (
                <a href={profileLink}>
                  <Group noWrap spacing={15} mt={3}>
                    <IconUser size={14} stroke={1.5} />
                    <Text size="xs" color="dimmed">View Profile</Text>
                  </Group>
                </a>

              )
            }

          </div>
        </Group>
      </div>)
};

export default withAuthenticationRequired(Profile, {
    onRedirecting: () => <Loading />,
});