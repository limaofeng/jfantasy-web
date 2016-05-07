var React = require("react");

var SimpleDataTable = React.createClass({
    render: function() {
        return (
            <div className="row">
                <div className="col-xs-12 col-md-12">
                    <div className="widget">
                        <div className="widget-header ">
                            <span className="widget-caption">Simple DataTable</span>
                            <div className="widget-buttons">
                                <a href="#" data-toggle="maximize">
                                    <i className="fa fa-expand"/>
                                </a>
                                <a href="#" data-toggle="collapse">
                                    <i className="fa fa-minus"/>
                                </a>
                                <a href="#" data-toggle="dispose">
                                    <i className="fa fa-times"/>
                                </a>
                            </div>
                        </div>
                        <div className="widget-body">
                            <table className="table table-striped table-bordered table-hover" id="simpledatatable">
                                <thead>
                                <tr>
                                    <th>
                                        <label>
                                            <input type="checkbox"/>
                                            <span className="text"/>
                                        </label>
                                    </th>
                                    <th>
                                        Username
                                    </th>
                                    <th>
                                        Email
                                    </th>
                                    <th>
                                        Points
                                    </th>
                                    <th>
                                        Joined
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>
                                        <label>
                                            <input type="checkbox"/>
                                            <span className="text"/>
                                        </label>
                                    </td>
                                    <td>
                                        shuxer
                                    </td>
                                    <td>
                                        <a href="mailto:shuxer@gmail.com">shuxer@gmail.com</a>
                                    </td>
                                    <td>
                                        120
                                    </td>
                                    <td className="center ">
                                        12 Jan 2012
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>
                                            <input type="checkbox"/>
                                            <span className="text"/>
                                        </label>
                                    </td>
                                    <td>
                                        looper
                                    </td>
                                    <td>
                                        <a href="mailto:looper90@gmail.com">looper90@gmail.com</a>
                                    </td>
                                    <td>
                                        120
                                    </td>
                                    <td className="center ">
                                        12.12.2011
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>
                                            <input type="checkbox"/>
                                            <span className="text"/>
                                        </label>
                                    </td>
                                    <td>
                                        userwow
                                    </td>
                                    <td>
                                        <a href="mailto:userwow@yahoo.com">userwow@yahoo.com</a>
                                    </td>
                                    <td>
                                        20
                                    </td>
                                    <td className="center ">
                                        12.12.2012
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label><input type="checkbox"/><span className="text"/></label>
                                    </td>
                                    <td>
                                        user1wow
                                    </td>
                                    <td>
                                        <a href="mailto:userwow@gmail.com">userwow@gmail.com</a>
                                    </td>
                                    <td>
                                        20
                                    </td>
                                    <td className="center ">
                                        12.12.2012
                                    </td>
                                </tr>
                                <tr className="odd gradeX">
                                    <td>
                                        <label><input type="checkbox"/><span className="text"></span></label>
                                    </td>
                                    <td>
                                        restest
                                    </td>
                                    <td>
                                        <a href="mailto:userwow@gmail.com">test@gmail.com</a>
                                    </td>
                                    <td>
                                        20
                                    </td>
                                    <td className="center ">
                                        12.12.2012
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label><input type="checkbox"/><span className="text"></span></label>
                                    </td>
                                    <td>
                                        foopl
                                    </td>
                                    <td>
                                        <a href="mailto:userwow@gmail.com">good@gmail.com</a>
                                    </td>
                                    <td>
                                        20
                                    </td>
                                    <td className="center ">
                                        19.11.2010
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label><input type="checkbox"/><span className="text"></span></label>
                                    </td>
                                    <td>
                                        weep
                                    </td>
                                    <td>
                                        <a href="mailto:userwow@gmail.com">good@gmail.com</a>
                                    </td>
                                    <td>
                                        20
                                    </td>
                                    <td className="center ">
                                        19.11.2010
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label><input type="checkbox"/><span className="text"></span></label>
                                    </td>
                                    <td>
                                        coop
                                    </td>
                                    <td>
                                        <a href="mailto:userwow@gmail.com">good@gmail.com</a>
                                    </td>
                                    <td>
                                        20
                                    </td>
                                    <td className="center ">
                                        19.11.2010
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label><input type="checkbox"/><span className="text"></span></label>
                                    </td>
                                    <td>
                                        pppol
                                    </td>
                                    <td>
                                        <a href="mailto:userwow@gmail.com">good@gmail.com</a>
                                    </td>
                                    <td>
                                        20
                                    </td>
                                    <td className="center ">
                                        19.11.2010
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label><input type="checkbox"/><span className="text"></span></label>
                                    </td>
                                    <td>
                                        test
                                    </td>
                                    <td>
                                        <a href="mailto:userwow@gmail.com">good@gmail.com</a>
                                    </td>
                                    <td>
                                        20
                                    </td>
                                    <td className="center ">
                                        19.11.2010
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label><input type="checkbox"/><span className="text"></span></label>
                                    </td>
                                    <td>
                                        userwow
                                    </td>
                                    <td>
                                        <a href="mailto:userwow@gmail.com">userwow@gmail.com</a>
                                    </td>
                                    <td>
                                        20
                                    </td>
                                    <td className="center ">
                                        12.12.2012
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label><input type="checkbox"/><span className="text"></span></label>
                                    </td>
                                    <td>
                                        test
                                    </td>
                                    <td>
                                        <a href="mailto:userwow@gmail.com">test@gmail.com</a>
                                    </td>
                                    <td>
                                        20
                                    </td>
                                    <td className="center ">
                                        12.12.2012
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label><input type="checkbox"/><span className="text"></span></label>
                                    </td>
                                    <td>
                                        goop
                                    </td>
                                    <td>
                                        <a href="mailto:userwow@gmail.com">good@gmail.com</a>
                                    </td>
                                    <td>
                                        20
                                    </td>
                                    <td className="center ">
                                        12.11.2010
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label><input type="checkbox"/><span className="text"></span></label>
                                    </td>
                                    <td>
                                        weep
                                    </td>
                                    <td>
                                        <a href="mailto:userwow@gmail.com">good@gmail.com</a>
                                    </td>
                                    <td>
                                        20
                                    </td>
                                    <td className="center ">
                                        15.11.2011
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label><input type="checkbox"/><span className="text"></span></label>
                                    </td>
                                    <td>
                                        toopl
                                    </td>
                                    <td>
                                        <a href="mailto:userwow@gmail.com">good@gmail.com</a>
                                    </td>
                                    <td>
                                        20
                                    </td>
                                    <td className="center ">
                                        16.11.2010
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label><input type="checkbox"/><span className="text"></span></label>
                                    </td>
                                    <td>
                                        userwow
                                    </td>
                                    <td>
                                        <a href="mailto:userwow@gmail.com">userwow@gmail.com</a>
                                    </td>
                                    <td>
                                        20
                                    </td>
                                    <td className="center ">
                                        9.12.2012
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label><input type="checkbox"/><span className="text"></span></label>
                                    </td>
                                    <td>
                                        tes21t
                                    </td>
                                    <td>
                                        <a href="mailto:userwow@gmail.com">test@gmail.com</a>
                                    </td>
                                    <td>
                                        20
                                    </td>
                                    <td className="center ">
                                        14.12.2012
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label><input type="checkbox"/><span className="text"></span></label>
                                    </td>
                                    <td>
                                        fop
                                    </td>
                                    <td>
                                        <a href="mailto:userwow@gmail.com">good@gmail.com</a>
                                    </td>
                                    <td>
                                        20
                                    </td>
                                    <td className="center ">
                                        13.11.2010
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label><input type="checkbox"/><span className="text"></span></label>
                                    </td>
                                    <td>
                                        kop
                                    </td>
                                    <td>
                                        <a href="mailto:userwow@gmail.com">good@gmail.com</a>
                                    </td>
                                    <td>
                                        20
                                    </td>
                                    <td className="center ">
                                        17.11.2010
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label><input type="checkbox"/><span className="text"></span></label>
                                    </td>
                                    <td>
                                        vopl
                                    </td>
                                    <td>
                                        <a href="mailto:userwow@gmail.com">good@gmail.com</a>
                                    </td>
                                    <td>
                                        20
                                    </td>
                                    <td className="center ">
                                        19.11.2010
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label><input type="checkbox"/><span className="text"></span></label>
                                    </td>
                                    <td>
                                        userwow
                                    </td>
                                    <td>
                                        <a href="mailto:userwow@gmail.com">userwow@gmail.com</a>
                                    </td>
                                    <td>
                                        20
                                    </td>
                                    <td className="center ">
                                        12.12.2012
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label><input type="checkbox"/><span className="text"></span></label>
                                    </td>
                                    <td>
                                        wap
                                    </td>
                                    <td>
                                        <a href="mailto:userwow@gmail.com">test@gmail.com</a>
                                    </td>
                                    <td>
                                        20
                                    </td>
                                    <td className="center ">
                                        12.12.2012
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label><input type="checkbox"/><span className="text"></span></label>
                                    </td>
                                    <td>
                                        test
                                    </td>
                                    <td>
                                        <a href="mailto:userwow@gmail.com">good@gmail.com</a>
                                    </td>
                                    <td>
                                        20
                                    </td>
                                    <td className="center ">
                                        19.12.2010
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label><input type="checkbox"/><span className="text"></span></label>
                                    </td>
                                    <td>
                                        toop
                                    </td>
                                    <td>
                                        <a href="mailto:userwow@gmail.com">good@gmail.com</a>
                                    </td>
                                    <td>
                                        20
                                    </td>
                                    <td className="center ">
                                        17.12.2010
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label><input type="checkbox"/><span className="text"></span></label>
                                    </td>
                                    <td>
                                        weep
                                    </td>
                                    <td>
                                        <a href="mailto:userwow@gmail.com">good@gmail.com</a>
                                    </td>
                                    <td>
                                        20
                                    </td>
                                    <td className="center ">
                                        15.11.2011
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = SimpleDataTable;