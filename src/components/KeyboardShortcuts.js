import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { QuestionnaireContext } from "../context/QuestionnaireContext";
import KeyboardEventHandler from "react-keyboard-event-handler";
import Table from "./aria-components/table/Table";
import {
  Cell,
  Column,
  Row,
  TableBody,
  TableHeader,
} from "@react-stately/table";
import { Card, CardContent, CardHeader } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    backgroundColor: "black",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  header: {
    display: "flex",
    fontSize: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 200,
    paddingRight: 200,
  },
  questionRow: {
    display: "flex",
    fontSize: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  question: {
    display: "flex",
    flexDirection: "row",
  },
  button: {
    backgroundColor: "white",
    color: "black",
    marginTop: 2.5,
    marginBottom: 2.5,
  },
  card: {
    backgroundColor: "whitesmoke",
    //width: "75%",
    alignSelf: "center",
    //height: "100%",
    padding: 50,
  },
  cardContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Key = ({ children }) => (
  <div
    style={{
      backgroundColor: "white",
      boxShadow: "0 1px 1px",
      borderRadius: 3,
      minWidth: 30,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 4,
      marginLeft: 8,
      marginRight: 8,
    }}
  >
    {children}
  </div>
);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function KeyboardShortcuts() {
  const { editableResponse, makeEdits, commitEdits, resetEdits } =
    useContext(QuestionnaireContext);
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const shortcuts = [
    {
      category: "Map Controls",
      keys: ["shift", "arrow"],
      description: "Pan Map in that direction",
    },
    {
      category: "",
      keys: ["shift", "+"],
      description: "Zoom in on map",
    },
    {
      category: "",
      keys: ["shift", "-"],
      description: "Zoom out on map",
    },
    {
      category: "",
      keys: ["R"],
      description: "Reset Zoom on map",
    },
    {
      category: "",
      keys: ["esc"],
      description: "Exit Map focus and return to controls menu",
    },
    {
      category: "",
      keys: [],
      description: "",
    },
    {
      category: "Dialog Control",
      keys: ["Q"],
      description: "Open the questionnaire dialog",
    },
    {
      category: "",
      keys: ["K"],
      description: "Open the keyboard keys dialog",
    },
    {
      category: "",
      keys: ["esc"],
      description: "Close dialog menu",
    },
  ];

  return (
    <>
      <KeyboardEventHandler
        handleFocusableElements={true}
        //className={classes.map}
        handleKeys={["k"]}
        onKeyEvent={handleClickOpen}
      />
      <Button
        variant="outlined"
        color="black"
        onClick={handleClickOpen}
        className={classes.button}
        fullWidth={true}
      >
        Open Keyboard Shortcuts
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Keyboard Shortcuts
            </Typography>
          </Toolbar>
        </AppBar>
        <Card sx={{ width: 275 }} className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Table
              aria-label="Keyboard Shortcuts for the Tool"
              style={{ height: "500px", width: "100%" }}
            >
              <TableHeader>
                <Column>Category</Column>
                <Column>Shortcut</Column>
                <Column>Description</Column>
              </TableHeader>
              <TableBody>
                {shortcuts.map(({ category, keys, description }) => (
                  <Row>
                    <Cell>{category}</Cell>
                    <Cell>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                        }}
                      >
                        {keys.map((shortcut, i) => (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <Key>{shortcut}</Key>
                            {i + 1 != keys.length && " + "}
                          </div>
                        ))}
                      </div>
                    </Cell>
                    <Cell aria-hidden={category == ""}>{description}</Cell>
                  </Row>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        {/* <div className={classes.header}>
            <span>Key</span>
            <span>Description</span>
          </div>
          {shortcuts.map(({ key, description }, i) => (
            <React.Fragment key={i}>
              <div className={classes.questionRow}>
                <span>{key}</span>
                <span>{description}</span>
              </div>
              <Divider />
            </React.Fragment>
          ))} */}
      </Dialog>
    </>
  );
}
