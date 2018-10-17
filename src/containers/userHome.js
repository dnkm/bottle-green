import React, { Component } from "react";
import { firestore, firebase } from "../utils/firebase";
import DeliveryMap from "../components/DeliveryMap";

import "./userHome.css";
// import {} from '../components/calendar';

export default class UserHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dates: [],
      loading: false,
      index: 0,
      nextDate: undefined
    };

    let d = new Date();
    d.setDate(d.getDate() + ((10 - d.getDay()) % 7)); // pick the next "wednesday"
    this.state.dates.push(this.formatDate(d));
    // add 4 more wednesdays
    for (let i = 0; i < 4; i++) {
      d.setDate(d.getDate() + 7);
      this.state.dates.push(this.formatDate(d));
    }

    // this.sortDocument = this.sortDocument.bind(this);
    this.signupForDate = this.signupForDate.bind(this);
  }

  formatDate(d) {
    return (
      d.getFullYear() +
      "/" +
      (d.getMonth() + 1 < 10 ? "0" : "") +
      (d.getMonth() + 1) +
      "/" +
      d.getDate()
    );
  }

  cancelSignup() {
    firestore
      .collection("appointments")
      .where("uid", "==", this.props.user.uid)
      .orderBy("nextDate", "desc")
      .limit(1)
      .get()
      .then(snapshot => {
        if (snapshot.size > 0) {
          let doc = snapshot.docs[0];
          firestore
            .collection("appointments")
            .doc(doc.id)
            .delete()
            .then(() => {
              this.setState({ nextDate: undefined });
            });
        }
      });
  }

  signupForDate() {
    const nextDate = this.state.dates[this.state.index];
    firestore
      .collection("appointments")
      .add({
        uid: this.props.user.uid,
        nextDate
      })
      .then(decRef => {
        this.setState(
          {
            nextDate
          },
          () => console.log("appointment made", this.state)
        );
      });
  }

  componentDidMount() {
    firestore
      .collection("appointments")
      .where("uid", "==", this.props.user.uid)
      .limit(1)
      .get()
      .then(snapshot => {
        if (snapshot.size > 0) {
          let doc = snapshot.docs[0];
          this.setState(
            {
              nextDate: doc.data().nextDate
            },
            () => {
              console.log("loading appoinmtnets", this.state);
            }
          );
        }
      });
  }

  // sortDocument(collection) {
  //   let d = new Date();
  //   let dates = [];

  //   firestore
  //     .collection(collection)
  //     .get()
  //     .then(function(querySnapshot) {
  //       querySnapshot.forEach(function(doc) {
  //         if (!doc.completed) {
  //           d = doc.data().time.toDate();
  //           let day =
  //             d.getFullYear() +
  //             '' +
  //             ('0' + (d.getMonth() + 1)).slice(-2) +
  //             '' +
  //             ('0' + d.getDate()).slice(-2);
  //           dates.push(day);
  //         }
  //       });

  //       console.log(dates);
  //     });

  //   this.setState({ dates, loading: false });
  // }

  render() {
    if (this.state.loading) {
      return <div>loading</div>;
    } else if (this.state.nextDate) {
      return (
        <div className="userHome">
          <h1 className="header" style={{ color: "#9fc753" }}>
            You Bottles Are Scheduled for Pickup
          </h1>
          <div className="Next">Pickup Date:</div>
          <div>
            <div className="Dates">{this.state.dates[this.state.index]}</div>
            <div className="but">
              <button
                className="dBefore"
                onClick={() => {
                  this.cancelSignup();
                }}
              >
                Cancel Sign up for this Date
              </button>

              <br />
              <div>{this.props.personalInfo.address}</div>
              <div>{this.props.personalInfo.city}</div>
              <div>{this.props.personalInfo.zip}</div>
            </div>
          </div>

          {this.props.personalInfo.address.length > 4 && (
            <DeliveryMap
              address={
                this.props.personalInfo.address +
                "+" +
                this.props.personalInfo.city +
                "+" +
                this.props.personalInfo.zip
              }
            />
          )}
        </div>
      );
    } else {
      return (
        <div className="userHome">
          <h1 className="header">Get your Bottles Picked Up</h1>
          <div className="Next">Next Available Date:</div>
          <div>
            <div className="Dates">{this.state.dates[this.state.index]}</div>
            <div className="but">
              <button
                className="dBefore"
                onClick={() => {
                  if (0 != this.state.index) {
                    let index = this.state.index;
                    this.setState({ index: index - 1 });
                  }
                }}
              >
                Date Before
              </button>

              <span />

              <button
                className="dAfter"
                onClick={() => {
                  if (this.state.dates.length - 1 != this.state.index) {
                    let index = this.state.index;
                    this.setState({ index: index + 1 });
                  }
                }}
              >
                Date After
              </button>

              <button onClick={this.signupForDate}>
                Sign up for this Date
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
}
