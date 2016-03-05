/**
 *
 * @author 
 *
 */
class ArrayUtil {
    public constructor() {

    }

    public static getDifferentInAB(ta: Array<any>,tb: Array<any>): Array<any> {
        var darr: Array<any> = [];
        var dd: number;
        for(var i = 0;i < ta.length;i++) {
            for(var j = 0;j < tb.length;j++) {
                if(ta[i] == tb[j]) {
                    dd = 1;
                    break;
                }
                else {
                    dd = 0;
                }
            }
            if(dd == 0) {
                darr.push(ta[i]);
            }
        }

        return darr;
    }

    public static sortByProperty(tvect: Array<any>,tproperty: string,tbig: boolean = true): Array<any> {
        tvect.sort(function(tobja: any,tobjb: any) { if(tobja.tproperty > tobjb.tproperty) { return tbig ? -1 : 1; } else { return tbig ? 1 : -1; } });

        return tvect;
    }

    public static getElementByProperty(tvect: Array<any>,tproperty: string,tvalue: any): any {
        var i: number,j: number = tvect.length;
        for(i = 0;i < j;i++) {
            if(tvect[i][tproperty] == tvalue) {
                return tvect[i];
            }
        }

        return undefined;
    }

    public static replaceElement(tvect: Array<any>,tnelme: any,toelem: any): void {
        if(this.hasElement(tvect,toelem)) {
            tvect[tvect.indexOf(toelem)] = tnelme;
        }
    }

    public static removeIndex(tvect: Array<any>,tindex: any): any {
        return tvect.splice(tindex,1);
    }

    public static hasElement(tvect: Array<any>,telement: any): boolean {
        return tvect.indexOf(telement) == -1 ? false : true;
    }

    public static removeElement(tvect: Array<any>,telement: any): any {
        return tvect.splice(tvect.indexOf(telement),1);
    }

    public static addElement(tvect: Array<any>,telement: any,only: boolean = true): void {
        if(!only) {
            tvect.push(telement);
        }
        else if(!this.hasElement(tvect,telement)) {
            tvect.push(telement);
        }
    }
	
    // This will parse a delimited string into an array of
    // arrays. The default delimiter is the comma, but this
    // can be overriden in the second argument.
    public static CSVToArray(strData,strDelimiter = undefined): any {
        // Check to see if the delimiter is defined. If not,
        // then default to comma.
        strDelimiter = (strDelimiter || ",");
         
        // Create a regular expression to parse the CSV values.
        var objPattern = new RegExp(
            (
                // Delimiters.
                "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
                 
                // Quoted fields.
                "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
                     
                // Standard fields.
                "([^\"\\" + strDelimiter + "\\r\\n]*))"
            ),
            "gi"
        );
                 
        // Create an array to hold our data. Give the array
        // a default empty first row.
        var arrVect = [[]];
        var arrDict = [{}];
        var arrIndex: number = 0;
        var dictIndex: number = 0;
                 
        // Create an array to hold our individual pattern
        // matching groups.
        var arrMatches = null;
                 
        // Keep looping over the regular expression matches
        // until we can no longer find a match.
        while(arrMatches = objPattern.exec(strData)) {
            // Get the delimiter that was found.
            var strMatchedDelimiter = arrMatches[1];
                     
            // Check to see if the given delimiter has a length
            // (is not the start of string) and if it matches
            // field delimiter. If id does not, then we know
            // that this delimiter is a row delimiter.
            if(strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
                // Since we have reached a new row of data,
                // add an empty row to our data array.
                if(arrIndex < 3) {
                    arrVect.push([]);
                    arrIndex++;
                }
                else {
                    arrDict.push({});
                    dictIndex = 0;
                }

            }
                         
            // Now that we have our delimiter out of the way,
            // let's check to see which kind of value we
            // captured (quoted or unquoted).
            if(arrMatches[2]) {
                // We found a quoted value. When we capture
                // this value, unescape any double quotes.
                var strMatchedValue = arrMatches[2].replace(new RegExp("\"\"","g"),"\"");
            }
            else {
                // We found a non-quoted value.
                var strMatchedValue = arrMatches[3];
            }
                                     
            // Now that we have our value string, let's add
            // it to the data array.
            
            strMatchedValue = strMatchedValue.replace(/\s+/g,"");
            if(arrIndex < 3) {
                arrVect[arrVect.length - 1].push(strMatchedValue);
            }
            else {
                if(arrVect[2][dictIndex] == "number") {
                    strMatchedValue = strMatchedValue == "" ? 0 : parseFloat(strMatchedValue);
                }
                arrDict[arrDict.length - 1][arrVect[1][dictIndex]] = strMatchedValue;
                dictIndex++;
            }
        }
                                 
        // Return the parsed data.
        arrDict.pop();
        return (arrDict);
    }
    
    
    
    //    public fetchAndDecode(file, encoding) {  
    //        var xhr = new XMLHttpRequest();  
    //        xhr.open('GET', file);  
    //        xhr.responseType = 'arraybuffer';  
    //        xhr.onload = function() {  
    //            if (this.status == 200) {  
    //                var dataView = new DataView(this.response);  
    //                var decoder = new TextDecoder(encoding);  
    //                var decodedString = decoder.decode(dataView);  
    //                console.info(decodedString);  
    //            } else {  
    //                console.error('Error while requesting', file, this);  
    //            }  
    //        };  
    //        xhr.send();  
    //    }  

}
    
    
    
