"use strict";

function convertDate(a) {
    var b, c = /^\s*(\d{4})-(\d\d)-(\d\d)\s*$/, d = new Date(0/0), e = c.exec(a);
    return "1901-01-01" === a ? "0/0/0" : (e && (b = +e[2], d.setFullYear(e[1], b - 1, e[3]), 
    b !== d.getMonth() + 1 && d.setTime(0/0)), [ d.getMonth() + 1, d.getDate(), d.getFullYear() ].join("/"));
}

function selectStudents(a) {
    var b = $j.unique($j("input:hidden").map(function() {
        return "ids=" + $j(this).val();
    })).get().join("&");
    b = b + "&selectionAction=" + a + "&temp=false", $j.ajax({
        type: "POST",
        url: "/admin/SaveSelectedStudentsToSelection.action",
        cache: !1,
        data: b.replace(/ids=&/gi, ""),
        success: function() {
            top.location = "/admin/home.html";
        },
        error: function() {
            closeLoading(), $j("body").append('<div id="curSelectFail" title="Error"><p>There was an error making the students the current selection.</p></div >'), 
            $j("#curSelectFail").dialog();
        }
    });
}

function clickStudentSelects(a) {
    loadingDialog(), $j.getJSON("json/" + dataOptions.reportid + '.json.html?curyearonly=" + dataOptions.curyearonly', function(b) {
        $j.each(b.ResultSet, function() {
            this.dcid && ($j("#StudentList").append('<li><a target="_top" href="/admin/students/home.html?frn=001' + this.dcid + '">' + this.student + "</a></li>"), 
            $j("#studentSelection").append('<input type="hidden" value="' + this.studentid + '"/>'));
        }), selectStudents(a);
    });
}

function selectOptions() {
    $j("[name=maxlines],[name=curyearonly]").val("?curyearonly=" + dataOptions.curyearonly + "&maxlines=" + dataOptions.maxLines + "&reportname=" + dataOptions.reportid);
}

function studentLink(a, b, c, d, e) {
    var f = b.getData(e);
    a.innerHTML = '<a href="/admin/students/home.html?frn=001' + f + "&ac=suv;lsp=/admin/students/" + d + '" target=PowerTools>' + c + "</a>";
}

function adminLink(a, b, c, d, e) {
    var f = b.getData(e);
    a.innerHTML = '<a href="/admin/' + d + f + '" target=Powertools>' + c + "</a>";
}

function ddaLink(a, b, c, d, e) {
    var f;
    f = b.getData(e ? e : "dcid"), a.innerHTML = '<a href="/admin/tech/usm/home.html?mcr=' + d + f + '" target=Powertools>' + c + "</a>";
}

function ddeLink(a, b, c, d, e) {
    var f;
    f = b.getData(e ? e : "dcid"), a.innerHTML = '<a href="/admin/tech/usm/home.html?mcr=' + d + f + '" target=Powertools>' + c + "</a>";
}

function existCheck(a, b, c, d, e) {
    var f = b.getData(d);
    a.innerHTML = c ? c : '<span class="errorField">' + e + " " + f + " does not exist</span>";
}

var $j = jQuery.noConflict(), closeLoading = window.closeLoading || {}, loadingDialog = window.loadingDialog || {}, dataOptions = window.dataOptions || {}, reportData = {};

YAHOO.widget.DataTable.prototype.getTdEl = function(a) {
    var b, c = YAHOO.util.Dom, d = YAHOO.lang, e = c.get(a);
    if (e && e.ownerDocument === document) {
        if (b = "td" !== e.nodeName.toLowerCase() ? c.getAncestorByTagName(e, "td") : e, 
        b && b.parentNode.parentNode === this._elTbody) return b;
    } else if (a) {
        var f, g, h = this.getTrEl(f);
        if (d.isString(a.columnKey) && d.isString(a.recordId)) {
            f = this.getRecord(a.recordId);
            var i = this.getColumn(a.columnKey);
            i && (g = i.getKeyIndex());
        }
        if (a.record && a.column && a.column.getKeyIndex && (f = a.record, g = a.column.getKeyIndex()), 
        null !== g && h && h.cells && h.cells.length > 0) return h.cells[g] || null;
    }
    return null;
};

var PowerTools = {
    templateCY: function() {
        return '{FirstPageLink} {PreviousPageLink} {PageLinks} {NextPageLink} {LastPageLink} <select name="maxlines" ONCHANGE="location = this.options[this.selectedIndex].value;"><option value="?curyearonly=' + dataOptions.curyearonly + "&maxlines=25&reportname=" + dataOptions.reportid + '">25 Rows</option><option value="?curyearonly=' + dataOptions.curyearonly + "&maxlines=50&reportname=" + dataOptions.reportid + '">50 Rows</option><option value="?curyearonly=' + dataOptions.curyearonly + "&maxlines=100&reportname=" + dataOptions.reportid + '">100 Rows</option><option value="?curyearonly=' + dataOptions.curyearonly + "&maxlines=500&reportname=" + dataOptions.reportid + '">500 Rows</option><option value="?curyearonly=' + dataOptions.curyearonly + "&maxlines=100000&reportname=" + dataOptions.reportid + '">Max Rows</option></select> <select name="curyearonly" ONCHANGE="location = this.options[this.selectedIndex].value;"><option value="?curyearonly=0&maxlines=' + dataOptions.maxLines + "&reportname=" + dataOptions.reportid + '">All Years</option><option value="?curyearonly=1&maxlines=' + dataOptions.maxLines + "&reportname=" + dataOptions.reportid + '">Current Year</option></select>';
    },
    templateNoCY: function() {
        return '{FirstPageLink} {PreviousPageLink} {PageLinks} {NextPageLink} {LastPageLink} <select name="maxlines" ONCHANGE="location = this.options[this.selectedIndex].value;"><option value="?curyearonly=0&maxlines=25&reportname=' + dataOptions.reportid + '">25 Rows</option><option value="?curyearonly=0&maxlines=50&reportname=' + dataOptions.reportid + '">50 Rows</option><option value="?curyearonly=0&maxlines=100&reportname=' + dataOptions.reportid + '">100 Rows</option><option value="?curyearonly=0&maxlines=500&reportname=' + dataOptions.reportid + '">500 Rows</option><option value="?curyearonly=0&maxlines=100000&reportname=' + dataOptions.reportid + '">Max Rows</option></select> ';
    },
    templateNoOption: function() {
        return "";
    },
    templateCYOnly: function() {
        return '<B>Filter these reports for </b><select name="curyearonly" ONCHANGE="location = this.options[this.selectedIndex].value;"><option value="?curyearonly=0&maxlines=' + dataOptions.maxLines + "&reportname=" + dataOptions.reportid + '">All Years</option><option value="?curyearonly=1&maxlines=' + dataOptions.maxLines + "&reportname=" + dataOptions.reportid + '">Current Year</option></select>';
    },
    ActivitiesLink: function(a, b, c, d) {
        adminLink(a, b, d, "activitiessetup/edit.html?frn=006", "dcid");
    },
    AllEnrollmentsLink: function(a, b, c, d) {
        studentLink(a, b, d, "allenrollments.html", "dcid");
    },
    AttCodeExistCheck: function(a, b, c, d) {
        var e = b.getData("attendanceCodeId"), f = b.getData("attendanceRecordCodeId");
        a.innerHTML = d || e ? d ? d : "(Present)" : '<span class="errorField">Attendance Code ID ' + f + " does not exist</span>";
    },
    AttendanceLink: function(a, b, c, d) {
        var e = b.getData("dcid"), f = b.getData("attendanceType");
        a.innerHTML = "Meeting" === f ? '<a href="/admin/students/home.html?frn=001' + e + '&ac=suv;lsp=/admin/attendance/view/meeting.html" target=Powertools>' + d + "</a>" : '<a href="/admin/students/home.html?frn=001' + e + '&ac=suv;lsp=/admin/attendance/view/daily.html" target=Powertools>' + d + "</a>";
    },
    BellScheduleItemsLink: function(a, b, c, d) {
        var e = b.getData("bellScheduleItemsDcid"), f = b.getData("bellScheduleItemsId"), g = b.getData("schoolName"), h = b.getData("yearId");
        a.innerHTML = '<a href="/admin/schoolsetup/bellschedules/items.html?frn=133' + e + "&id=" + f + "&name=" + d + " at " + g + " for " + h + '" target=Powertools>' + d + "</a>";
    },
    BlankDayFormat: function(a, b, c, d) {
        a.innerHTML = d ? d : '<span class="errorField">BLANK</span>';
    },
    CalendarLink: function(a, b, c, d) {
        var e = convertDate(d);
        a.innerHTML = '<a href="/admin/schoolsetup/calendarsetup/calendarsetup.html?scheddate=' + e + '" target=Powertools>' + e + "</a>";
    },
    CCTermExistCheck: function(a, b) {
        var c = b.getData("termId"), d = b.getData("ccTermId");
        a.innerHTML = c ? c : '<span class="errorField">TermID ' + d + " does not exist</span>";
    },
    CourseGroupsLink: function(a, b, c, d) {
        adminLink(a, b, d, "coursegroups/edit.html?frn=006", "dcid");
    },
    CourseSection: function(a, b) {
        var c = b.getData("courseNumber"), d = b.getData("sectionNumber");
        a.innerHTML = c + "." + d;
    },
    CourseSectionLink: function(a, b) {
        var c = b.getData("courseNumber"), d = b.getData("sectionNumber"), e = b.getData("dcid");
        a.innerHTML = '<a href="/admin/sections/edit.html?frn=003' + e + '" target=PowerTools>' + c + "." + d + "</a>";
    },
    DateNoLink: function(a, b, c, d) {
        a.innerHTML = "1900-01-01" === d ? "0/0/0" : convertDate(d);
    },
    DDAAttendanceLink: function(a, b, c, d) {
        ddaLink(a, b, d, "157", "attendanceDcid");
    },
    DDAAttendanceTimeLink: function(a, b, c, d) {
        ddaLink(a, b, d, "158");
    },
    DDACCLink: function(a, b, c, d) {
        ddaLink(a, b, d, "004");
    },
    DDAFeeTransactionLink: function(a, b, c, d) {
        ddaLink(a, b, d, "147");
    },
    DDAHonorRollLink: function(a, b, c, d) {
        ddaLink(a, b, d, "034");
    },
    DDAPGFinalGradesLink: function(a, b, c, d) {
        ddaLink(a, b, d, "095");
    },
    DDAReenrollmentsLink: function(a, b, c, d) {
        ddaLink(a, b, d, "018");
    },
    DDASectionLink: function(a, b, c, d) {
        ddaLink(a, b, d, "003");
    },
    DDASpEnrollmentsLink: function(a, b, c, d) {
        ddaLink(a, b, d, "041");
    },
    DDAStandardsGradesLink: function(a, b, c, d) {
        ddaLink(a, b, d, "099");
    },
    DDAStoredGradesLink: function(a, b, c, d) {
        a.innerHTML = '<a href="/admin/tech/usm/home.html?mcr=031' + d + '" target=Powertools>' + d + "</a>";
    },
    DDAStudentRaceLink: function(a, b, c, d) {
        ddaLink(a, b, d, "201");
    },
    DDAStudentsLink: function(a, b, c, d) {
        ddaLink(a, b, d, "001");
    },
    DDAStudentTestScoreLink: function(a, b, c, d) {
        ddaLink(a, b, d, "089");
    },
    DDATeacherRaceLink: function(a, b, c, d) {
        ddaLink(a, b, d, "202");
    },
    DDATermBinsLink: function(a, b, c, d) {
        ddaLink(a, b, d, "033");
    },
    DDEAttendanceLink: function(a, b, c, d) {
        ddeLink(a, b, d, "157", "attendanceDcid");
    },
    DDEAttendanceTimeLink: function(a, b, c, d) {
        ddeLink(a, b, d, "158");
    },
    DDECCLink: function(a, b, c, d) {
        ddeLink(a, b, d, "004");
    },
    DDEFeeTransactionLink: function(a, b, c, d) {
        ddeLink(a, b, d, "147");
    },
    DDEHonorRollLink: function(a, b, c, d) {
        ddeLink(a, b, d, "034");
    },
    DDEPGFinalGradesLink: function(a, b, c, d) {
        ddeLink(a, b, d, "095");
    },
    DDEReenrollmentsLink: function(a, b, c, d) {
        ddeLink(a, b, d, "018");
    },
    DDESectionLink: function(a, b, c, d) {
        ddeLink(a, b, d, "003");
    },
    DDESpEnrollmentsLink: function(a, b, c, d) {
        ddeLink(a, b, d, "041");
    },
    DDEStandardsGradesLink: function(a, b, c, d) {
        ddeLink(a, b, d, "099");
    },
    DDEStoredGradesLink: function(a, b, c, d) {
        a.innerHTML = '<a href="/admin/tech/dde/home.html?mcr=031' + d + '" target=Powertools>' + d + "</a>";
    },
    DDEStudentRaceLink: function(a, b, c, d) {
        ddeLink(a, b, d, "201");
    },
    DDEStudentsLink: function(a, b, c, d) {
        ddeLink(a, b, d, "001");
    },
    DDEStudentTestScoreLink: function(a, b, c, d) {
        ddeLink(a, b, d, "089");
    },
    DDETeacherRaceLink: function(a, b, c, d) {
        ddeLink(a, b, d, "202");
    },
    DDETermBinsLink: function(a, b, c, d) {
        ddeLink(a, b, d, "033");
    },
    DemographicsLink: function(a, b, c, d) {
        studentLink(a, b, d, "generaldemographics.html", "dcid");
    },
    Demographics2Link: function(a, b, c, d) {
        studentLink(a, b, d, "genderaldemographics.html", "student2dcid");
    },
    DoesNotExist: function(a, b, c, d) {
        a.innerHTML = d.search("does not exist") > -1 ? '<span class="errorField">' + d + "</span>" : d;
    },
    EnrollmentDateNoLink: function(a, b, c, d) {
        var e;
        e = d ? convertDate(d) : "Not Enrolled", a.innerHTML = e;
    },
    FeeExistCheck: function(a, b, c, d) {
        existCheck(a, b, d, "feeId", "Fee ID");
    },
    GradeLevelValidCheck: function(a, b, c, d) {
        var e = b.getData("schoolId"), f = b.getData("schoolHighGrade"), g = b.getData("schoolLowGrade"), h = b.getData("schoolName");
        a.innerHTML = "999999" === e && "99" !== d ? '<span class="errorField">Enrollment is at Graduated students, but grade level is ' + d + "</span>" : !h || d >= g && f >= d ? d : '<span class="errorField">' + h + " does not have a grade level of " + d + "</span> ";
    },
    GradeScalesLink: function(a, b, c, d) {
        adminLink(a, b, d, "marks/editscale.html?frn=090", "dcid");
    },
    GradYear: function(a, b) {
        var c = b.getData("yearOfGraduation");
        a.innerHTML = 0 === c ? '<span class="errorField">Not set</span>' : c;
    },
    IncidentLink: function(a, b, c, d) {
        adminLink(a, b, d, "admin/incidents/incidentlog.html?id=", "incidentId");
    },
    InvalidGPAPoints: function(a, b) {
        var c = b.getData("gpaPoints"), d = b.getData("gradePoints");
        a.innerHTML = c !== d ? '<span class="errorField">' + c + " / " + d + "</span>" : c + " / " + d;
    },
    InvalidGrade: function(a, b) {
        var c = b.getData("grade"), d = b.getData("gradescaleGrade");
        a.innerHTML = c !== d ? '<span class="errorField">' + c + " / " + d + "</font>" : c + " / " + d;
    },
    LogEntryLink: function(a, b, c, d) {
        var e = b.getData("dcid"), f = b.getData("logdcid");
        a.innerHTML = '<a href="/admin/students/home.html?frn=001' + e + "&ac=suv;lsp=/admin/students/customlogentry.html?frn=008" + f + "&studentfrn=001" + e + '" target=Powertools>' + d + "</a>";
    },
    NextGrade: function(a, b) {
        var c = b.getData("nextSchoolName"), d = b.getData("nextSchoolNumber"), e = Number(b.getData("nextYearGrade")), f = Number(b.getData("lowGrade")), g = Number(b.getData("highGrade"));
        a.innerHTML = "" !== c && 0 !== d && (f > e || e > g) ? '<span class="errorField">Students next grade is ' + e + ", however the schools grade levels are between " + f + " and " + g + "</span>" : e;
    },
    NextSchool: function(a, b) {
        var c = b.getData("nextSchoolName"), d = b.getData("nextSchoolID");
        a.innerHTML = c || "0" !== d ? c || "0" === d ? c : '<span class="errorField">School number ' + d + " does not exist</span>" : '<span class="errorField">Not set</span>';
    },
    NotSpecifiedError: function(a, b, c, d) {
        a.innerHTML = "Not Specified" === d ? '<span class="errorField">Not Specified</span>' : d;
    },
    OverviewCount: function(a, b, c, d) {
        var e = b.getData("forcedTotal");
        e ? a.innerHTML = '<a href="report.html?curyearonly=' + dataOptions.curyearonly + "&maxlines=" + dataOptions.maxLines + "&reportname=" + dataOptions.reportid + '">' + e + "</a>" : $j.getJSON("json/" + d + ".json.html?curyearonly=" + dataOptions.curyearonly, function(b) {
            b.ResultSet.pop(), a.innerHTML = '<a href="report.html?curyearonly=' + dataOptions.curyearonly + "&maxlines=" + dataOptions.maxLines + "&reportname=" + d + '">' + b.ResultSet.length + "</a>";
        });
    },
    OverviewLink: function(a, b, c, d) {
        var e = b.getData("reportName");
        a.innerHTML = '<a href="report.html?curyearonly=' + dataOptions.curyearonly + "&maxlines=" + dataOptions.maxLines + "&reportname=" + e + '">' + d + "</a>";
    },
    PeriodExistCheck: function(a, b, c, d) {
        existCheck(a, b, d, "periodId", "Period ID");
    },
    PreviousGradesLink: function(a, b, c, d) {
        studentLink(a, b, d, "previousgrades.html", "dcid");
    },
    ProgramExistCheck: function(a, b, c, d) {
        existCheck(a, b, d, "programId", "Program ID");
    },
    RaceCodeExistCheck: function(a, b, c, d) {
        existCheck(a, b, d, "raceCodeId", "Race code");
    },
    ReportsLink: function(a, b, c, d) {
        var e = b.getData("dcid"), f = b.getData("reportType");
        "Object Report" === f ? a.innerHTML = '<a href="/admin/objectreports/new.html?frn=022' + e + '" target=Powertools>' + d + "</a>" : "Mailing Label" === f ? a.innerHTML = '<a href="/admin/mailinglabels/edit.html?frn=022' + e + '" target=Powertools>' + d + "</a>" : "Form Letter" === f ? a.innerHTML = '<a href="/admin/formletters/edit.html?frn=022' + e + '" target=Powertools>' + d + "</a>" : "Report Card" === f && (a.innerHTML = '<a href="/admin/reportcards/edit.html?frn=022' + e + '" target=Powertools>' + d + "</a>");
    },
    ScheduleSetup: function(a, b, c, d) {
        studentLink(a, b, d, "schedulesetup.html", "dcid");
    },
    SchoolExistCheck: function(a, b) {
        var c = b.getData("schoolName"), d = b.getData("schoolId");
        a.innerHTML = "0" === d ? "District Office" : c ? c : '<span class="errorField">School number ' + d + " does not exist</span>";
    },
    SchoolExistNoDistrictCheck: function(a, b) {
        var c = b.getData("schoolName"), d = b.getData("schoolId");
        a.innerHTML = "0" === d ? '<span class="errorField">District Office should not have these records</span>' : c ? c : '<span class="errorField">School number ' + d + " does not exist</span>";
    },
    SectionTermExistCheck: function(a, b) {
        var c = b.getData("schoolTermId"), d = b.getData("sectionTermId");
        a.innerHTML = c ? c : '<span class="errorField">TermID ' + d + " does not exist</span>";
    },
    SpecialProgramsLink: function(a, b, c, d) {
        studentLink(a, b, d, "specialprograms.html", "dcid");
    },
    StandardExistCheck: function(a, b, c, d) {
        existCheck(a, b, d, "standardId", "Standard ID");
    },
    StandardsLink: function(a, b, c, d) {
        adminLink(a, b, d, "/standards/editstandard.html?frn=053", "dcid");
    },
    StdConversionLink: function(a, b, c, d) {
        adminLink(a, b, d, "stdconversiontable/editscale.html?frn=006", "dcid");
    },
    StudentExistCheck: function(a, b, c, d) {
        existCheck(a, b, d, "studentId", "Student ID");
    },
    TeacherEditLink: function(a, b, c, d) {
        adminLink(a, b, d, "faculty/home.html?frn=005", "dcid");
    },
    TeacherEdit2Link: function(a, b, c, d) {
        adminLink(a, b, d, "faculty/home.html?frn=005", "teacher2dcid");
    },
    TeacherExistCheck: function(a, b, c, d) {
        existCheck(a, b, d, "teacherId", "Teacher ID");
    },
    TestExistCheck: function(a, b, c, d) {
        var e = b.getData("testId"), f = b.getData("studentTestId");
        a.innerHTML = e ? d ? d : '<span class="errorField">Test ID ' + e + " does not exist</span>" : '<span class="errorField">StudentTestID ' + f + " does not exist</span>";
    },
    TestScoreExistCheck: function(a, b, c, d) {
        existCheck(a, b, d, "testScoreId", "Test Score ID");
    },
    TransactionsLink: function(a, b, c, d) {
        studentLink(a, b, d, "transactions.html", "dcid");
    },
    TransferInfoLink: function(a, b, c, d) {
        studentLink(a, b, d, "transferinfo.html", "dcid");
    }
};

$j(function() {
    $j("#top_container,#bottom_container").bind("DOMNodeInserted DOMSubtreeModified DOMNodeRemoved", function() {
        selectOptions();
    });
}).ajaxStart(function() {
    loadingDialog();
});