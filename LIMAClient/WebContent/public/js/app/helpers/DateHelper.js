/**
 * @author Hemanth B
 **/

/*
 * Helper for date. Work with date
 */

var month_names = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug",
		"Sep", "Oct", "Nov", "Dec" ];

var DateHelper = {

	/**
	 * Format date for views
	 * @param Date date
	 **/
	dateHelper : function(date) {
		return month_names[date.getMonth()] + " " + date.getDate() + ", "
				+ date.getFullYear();
	},
	calculateDuration : function(date) {

		var updatedDate = new Date(date);
		var todate = new Date();

		var divideBy = {
			day : 2630000000,
			week : 604800000,
			day : 86400000,
			hour : 3600000,
			minute : 60000,
			second : 1000
		};

		var datepart = "s";

		var diff = todate - updatedDate;

		if (diff > 2630000000) {
			datepart = "day";
		} else if (diff > 604800000) {
			datepart = "week";
		} else if (diff > 86400000) {
			datepart = "day";
		} else if (diff > 3600000) {
			datepart = "hour";
		} else if (diff > 60000) {
			datepart = "minute";
		} else {
			datepart = "second";
		}

		return Math.floor(diff / divideBy[datepart]) + " " + datepart + "s ago";

	},
	/**
	 * Parse date from SQL format
	 * @param string sqlDate
	 * @return Date date
	 **/
	parseDateHelper : function(sqlDate) {
		if (_.isUndefined(sqlDate) || _.isNull(sqlDate)) {
			return new Date(0);
		}
		var t = sqlDate.split(/[- :]/);
		var date = new Date(parseInt(t[0], 10), parseInt(t[1], 10) - 1,
				parseInt(t[2], 10), parseInt(t[3], 10), parseInt(t[4], 10),
				parseInt(t[5], 10));

		return date;

	},

	/**
	 * Parse date from "yyyy/mm/dd" format
	 * @param string strDate
	 * @return Date date
	 **/
	parseStrDateHelper : function(strDate) {

		if (_.isUndefined(strDate) || _.isNull(strDate) || strDate == "") {
			return null;
		}
		strDate.trim();
		var t = strDate.split(/[\/]/);
		var date = new Date(parseInt(t[0], 10), parseInt(t[1], 10) - 1,
				parseInt(t[2], 10));

		return date;

	},

	/**
	 * Make date for choise
	 * @param Date date
	 * @return string
	 */
	makeChoiseDateHelper : function(date) {
		if (date != null) {
			return this.makeDateHelper(date, "/");
		}
		return "";
	},

	makeChoiseDateSqlHelper : function(date) {
		if (date != null) {
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			if (month < 10)
				month = "0" + month;
			return year + "-" + month;
		}
		return null;
	},

	/**
	 * Make SQL date format
	 * @param Date date
	 * @return string sqlDate
	 */
	makeSqlDateHelper : function(date) {
		return this.makeDateHelper(date, "-");
	},

	makeDateHelper : function(date, separator) {
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		if (month < 10)
			month = "0" + month;
		var day = date.getDate();
		if (day < 10)
			day = "0" + day;
		return year + separator + month + separator + day;
	}
};