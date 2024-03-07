import { createStyles, Text, Avatar, Group, TypographyStylesProvider, Paper, Button, Notification } from '@mantine/core';
import { IconCheck } from '@tabler/icons';
import { useState} from 'react';
import Loading from "../../components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Dialog, DialogTitle, DialogContent, DialogActions} from "@material-ui/core";
import { AiOutlineLogout } from 'react-icons/ai';
import './dashboard.css';

const useStyles = createStyles((theme) => ({
  comment: {
    padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
    width:"50%"
  },
  exploreBtn : {
    alignSelf:'center',
    marginTop:10
  },
  body: {
    paddingLeft: 54,
    paddingTop: theme.spacing.sm,
    fontSize: theme.fontSizes.sm,
  },

  content: {
    '& > p:last-child': {
      marginBottom: 0,
    },
  },
}));

const CommentHtml =  {
  postedAt : 'Founder at Concept App',
  body: 'Hello, you\'re logged in <br/> Welcome to the Concept App. Explore different concepts.' ,
  author : {
    name: 'Michael Trembovler',
    image: 'https://avatars.githubusercontent.com/u/42732094?v=4'
  }
}



function Dashboard() {
  const { classes } = useStyles();
  const { user } = useAuth0();
  console.log(user);
  const [showNotification,setShowNotification] = useState(false);

  //------------------------
  const { logout } = useAuth0();
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleBackButtonClick = () => {
    setDialogOpen(true);
  };

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };
  //-------------------------

  return (
    <div className="dashboard" >
      <Button className="logout-button" onClick={handleBackButtonClick}>
          <AiOutlineLogout size={16} />
      </Button>
      <Dialog
        open={isDialogOpen}
        onClose={() => setDialogOpen(false)}
      >
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>Do you want to exit?</DialogContent>
        <DialogActions>
          <Button onClick={handleLogout} color="secondary">
            Yes
          </Button>
          <Button onClick={() => setDialogOpen(false)}>No</Button>
        </DialogActions>
      </Dialog>
      <div style={{display:'flex', justifyContent:'center'}}>

      <Paper withBorder radius="md" className={`${classes.comment} comment-mobile`}>
        <Group style={{ marginLeft: 40}}>
          <Avatar src={CommentHtml.author.image} alt={''} radius="xl" />
          <div>
            <Text size="sm">{CommentHtml.author.name}</Text>
            <Text size="xs" color="dimmed">
              {CommentHtml.postedAt}
            </Text>
          </div>
        </Group>
        <TypographyStylesProvider className={classes.body}>
          <div className={classes.content} dangerouslySetInnerHTML={{ __html: CommentHtml.body }} />
          <Button onClick={() => {setShowNotification(true)}} className={classes.exploreBtn} size="xs">
              Explore Concepts
            </Button>
        </TypographyStylesProvider>

        {showNotification && <Notification  onClose={() => {setShowNotification(false)}} className={classes.exploreBtn} icon={<IconCheck size={20} />} title="Wow Glad you're exploring">
          You can have access to all the concepts and create it.
        </Notification>}

      </Paper>




      </div>

    </div>
  );
}

export default withAuthenticationRequired(Dashboard, {
  onRedirecting: () => <Loading />,
});