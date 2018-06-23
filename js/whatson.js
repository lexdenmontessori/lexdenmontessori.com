require([underscorejs, datejs], function() {
    
    // Stupid _.flatten is multi-level
    var flatten = function(arr) { return _.flatten(arr, true); }

    var calendars = {
	weekly_topic: "lexdenmontessori.com_q893apaeb8irdn56ruqro3a1ps@group.calendar.google.com",
	activities: "lexdenmontessori.com_iqqjk0qjgr4umadm3lgm6hbnso@group.calendar.google.com",
	daily_craft: "lexdenmontessori.com_n703892o6mitnd9o31e1bvblio@group.calendar.google.com",
	daily_planning: "lexdenmontessori.com_q8evtmjh8r04vevtovfbgd5e18@group.calendar.google.com",
	events: "8hep1tjpchfd39p4pq14ii6j5c@group.calendar.google.com",
	makaton: "lexdenmontessori.com_rsau3vc2vdr11tlk3ll0r9mte4@group.calendar.google.com",
	sessions: "lexdenmontessori.com_787maj9js9o1puf2ktpl47p524@group.calendar.google.com",
	term_dates: "lexdenmontessori@gmail.com"
    };

    function AttrVal(attr,val) {
	this.attr = attr;
	this.val = val;
    }

    function get_events(query, cb) {
	var api_key = "AIzaSyBut2gH-n0R9rIq9LeZdchKVMGaYheK4aQ";

	/** [AttrVal] -> String */
	function serializeAttrs(attrvals) {
	    return _.foldl(attrvals, function(s,a) { return s + "&" + a.attr + "=" + a.val; }, "");
	}

	var url =
	    "https://www.googleapis.com/calendar/v3/calendars/"
	    + query.calendar
	    + "/events?"
	    + serializeAttrs(flatten([
		query.filter,
		[ new AttrVal("key", api_key),
		  new AttrVal("fields", query.fields),
		  new AttrVal("callback", "?")
		]
	    ]));

	console.log(url);
	$.getJSON(url, cb);
    }

    var today = Date.today();
    var lastSaturday = today.moveToDayOfWeek(6, -1);
    var nextFriday = today.moveToDayOfWeek(5, 1);

    $(document).ready(function() {
	get_events({
	    calendar: calendars.weekly_topic,
	    filter: [
		new AttrVal("timeMin", "2012-02-20T00:00:00Z"),
		new AttrVal("timeMax", "2012-02-27T00:00:00Z"),
	    ],
	    fields: "items(start,end,summary)"
	}, function(events) {
	    console.log(events);
	});
    });
});