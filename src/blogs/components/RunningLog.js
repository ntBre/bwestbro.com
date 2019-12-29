import React from "react";
import "../../index.css"

class RunningLog extends React.Component {
    render() {
	return (
	    <div className="blog">
	      <h3>A Running Log in Org Mode</h3>
	      <p>
		Org-mode and its tables were some of the major factors drawing me to
		Emacs in the first place, so as I began running again, I decided that
		it would be interesting to make my running log in org-mode. I began by
		including my Plan, taken from{" "}
		<a href="https://www.halhigdon.com/training-programs/base-training/novice-base-training/">
		  Hal Higdon's Novice Base Training
		</a>{" "}
		as a fairly simple table, but already I had a chance to learn my first
		piece of org tables as I tried to get the week number to automatically
		populate. As you can see in the source code below, I used
                the <code>tblfm</code> directive to fill the first column with an
		ascending counter based on the advice of <a href="https://emacs.stackexchange.com/questions/14681/org-mode-table-row-number-grow-automatically">this StackExchange thread
		</a>
		. The rest I filled in manually, taking advantage of evil-mode visual
		selection to take care of most of the replicate work.
	      </p>
	      <div className="org-src-container">
		<pre className="src src-emacs-lisp">
		  Plan{"\n"}
		  |------+------+------------+------------+------------+------+-------------+------------|
		  {"\n"}| Week | Mon{"  "}| Tue{"        "}| Wed{"        "}| Thu
		  {"        "}| Fri{"  "}| Sat{"         "}| Sun{"        "}|{"\n"}
		  |------+------+------------+------------+------------+------+-------------+------------|
		  {"\n"}|{"    "}1 | Rest | 1.5 mi run | 3.0 mi run | 1.5 mi run |
		  Rest | 30 min walk | 3.0 mi run |{"\n"}|{"    "}2 | Rest | 1.5 mi
		  run | 3.0 mi run | 1.5 mi run | Rest | 30 min walk | 3.5 mi run |
		  {"\n"}|{"    "}3 | Rest | 1.5 mi run | 3.0 mi run | 1.5 mi run |
		  Rest | 30 min walk | 3.0 mi run |{"\n"}|{"    "}4 | Rest | 2.0 mi
		  run | 3.0 mi run | 1.5 mi run | Rest | 30 min walk | 4.0 mi run |
		  {"\n"}|{"    "}5 | Rest | 2.0 mi run | 3.0 mi run | 2.0 mi run |
		  Rest | 30 min walk | 3.0 mi run |{"\n"}|{"    "}6 | Rest | 2.0 mi
		  run | 3.0 mi run | 2.0 mi run | Rest | 30 min walk | 4.5 mi run |
		  {"\n"}|{"    "}7 | Rest | 2.0 mi run | 3.0 mi run | 2.0 mi run |
		  Rest | 30 min walk | 3.0 mi run |{"\n"}|{"    "}8 | Rest | 2.5 mi
		  run | 3.0 mi run | 2.0 mi run | Rest | 30 min walk | 5.0 mi run |
		  {"\n"}|{"    "}9 | Rest | 2.5 mi run | 3.0 mi run | 2.5 mi run |
		  Rest | 30 min walk | 3.0 mi run |{"\n"}|{"   "}10 | Rest | 2.5 mi
		  run | 3.0 mi run | 2.5 mi run | Rest | 30 min walk | 5.5 mi run |
		  {"\n"}|{"   "}11 | Rest | 3.0 mi run | 3.0 mi run | 3.0 mi run |
		  Rest | 30 min walk | 3.0 mi run |{"\n"}|{"   "}12 | Rest | 3.0 mi
		  run | 3.0 mi run | 3.0 mi run | Rest | 30 min walk | 6.0 mi run |
		  {"\n"}
		  |------+------+------------+------------+------------+------+-------------+------------|
		  {"\n"}#+tblfm: $1=@#-1 {"\n"}
		</pre>
	      </div>
	      <p>
		Once this was finished, I started working on the more interesting
		problem of creating a useful running log. My first draft was pretty
		lame, following the pattern of the plan table and not calculating
		anything besides a weekly distance total as seen below. Here I
		actually wrote my first formula, again using <code>tblfm</code> and
		this time telling org to make the 9th column equal to the sum of
		columns 2 through 8. I also learned how to actually refresh the
		formula by pressing C-c C-c on the formula itself rather than anywhere
		in the table.
	      </p>
	      <div className="org-src-container">
		<pre className="src src-emacs-lisp">
		  |------+-----+-----+-----+-----+-----+-----+-----+-------|{"\n"}|
		  Week | Mon | Tue | Wed | Thu | Fri | Sat | Sun | Total |{"\n"}
		  |------+-----+-----+-----+-----+-----+-----+-----+-------|{"\n"}|
		  {"    "}1 | 0.0 |{"     "}|{"     "}|{"     "}|{"     "}|{"     "}|
		  {"     "}|{"    "}0. |{"\n"}
		  |------+-----+-----+-----+-----+-----+-----+-----+-------|{"\n"}
		  #+tblfm: $9=vsum($2..$8){"\n"}
		</pre>
	      </div>
	      <p>
		However, this wasn't really all I wanted out of my running log. Intead
		I wanted it at least to include my time in addition to distance and to
		use the two to calculate my pace. I'm not sure I went with the ideal
		table layout for this but once I got something passable I moved ahead
		with the real challenge, which was doing the pace calculations. As it
		turns out, this was only a real challenge because I made a dumb
		mistake somewhere, and everything was quite easy as shown below. I
		just had to divide the time by the distance and use the{" "}
		<code>;T</code> command at the end to convert back to a time.
	      </p>
	      <div className="org-src-container">
		<pre className="src src-emacs-lisp">
		  |------+-----+----------+----------+----------+-------+-------|
		  {"\n"}| Week | Day | Distance |{"     "}Time |{"     "}Pace | Route
		  | Notes |{"\n"}
		  |------+-----+----------+----------+----------+-------+-------|
		  {"\n"}|{"    "}1 | Mon |{"     "}5.00 | 00:22:10 | 00:04:26 |
		  {"       "}|{"       "}|{"\n"}
		  |------+-----+----------+----------+----------+-------+-------|
		  {"\n"}#+tblfm: $5=$4/$3
		  <span
		    style={{
			color: "#73d216"
		    }}
		  >
		    ;
		  </span>
		  <span
		    style={{
			color: "#73d216"
		    }}
		  >
		    T
		  </span>
		  {"\n"}
		</pre>
	      </div>
              <p>
                Additionally, I was concerned that some of my routes or notes might be
                longer than the line, so upon a quick search I found{" "}
                <a href="https://emacs.stackexchange.com/questions/38135/wrap-cell-content-in-an-org-mode-table">
                  this thread
                </a>{" "}
                that describes converting to a table.el table instead of the default
                org-table, which may come in handy in the future. Another interesting
                idea for the future will be plotting my data with Org Plot, but I have
                not yet implemented this feature.
              </p>
            </div>
        );
    }
}

export default RunningLog;