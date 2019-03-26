import React from "react";
import renderer from "react-test-renderer";
import { SeanceGroup } from "./../SeanceGroup";
import { Seance } from "../../redux/seances/types";

test("Today", () => {
  const seances = [
    {
      id: 928294,
      multikinoId: 3743772,
      date: new Date("2019-03-26T09:45:00.000Z").getTime(),
      allSeatCount: 144,
      takenSeatCount: 5,
      seatAvailability: 0.96527777777778,
      loading: false,
      errorMessage: ""
    },
    {
      id: 928295,
      multikinoId: 3743779,
      date: new Date("2019-03-26T15:00:00.000Z").getTime(),
      allSeatCount: 144,
      takenSeatCount: 5,
      seatAvailability: 0.96527777777778,
      loading: false,
      errorMessage: ""
    }
  ] as Seance[];

  const component = renderer.create(
    <SeanceGroup type="today" seances={seances} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
