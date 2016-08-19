var res = {'width' : 1024, 'height' : 768};
var debug = false;
var ctracker;
var positions;
var currentMask = 0;
var animationRequest;
var fd;
var videoInput;
var masks = {
  "hedda" : [[199.95963180488238,635.8630553954708],[192.83303456047977,771.6595226664622],[212.85009412560655,909.7951350731983],[252.6793082929467,1051.199399675636],[328.6713892561637,1156.0405963451497],[399.54476241798346,1209.928625754643],[503.06523620929363,1256.5772444158004],[602.7574731359426,1262.0336439111263],[705.0576059654207,1233.6610862839157],[798.2218295906182,1163.6101689899222],[841.1979009276748,1078.3048679368205],[854.766337667437,976.9684555222826],[885.6306669177089,861.3418028407887],[901.0245312593305,753.6691902351656],[894.9712318235254,640.2891991382704],[844.4004429236242,589.7652156648268],[800.3973927889108,581.1717805430302],[762.4842524376493,586.635276567717],[714.1744055635518,607.4377790447886],[368.51282497562613,614.5434615732175],[425.307179722022,599.7132784541252],[488.42481605639995,601.11063401892],[535.0148254432702,610.8505755427082],[363.7086526346981,691.5377808838784],[448.8443047088148,632.0398235366603],[541.9746187101902,700.3403000659052],[452.3902690417943,717.158426479235],[457.4447462132745,673.281107922464],[853.8037555855506,663.3667387710846],[779.6574619549075,623.2562694205601],[700.2105483326395,680.6818654349067],[792.0625465723955,699.1938063951716],[783.7353959727604,659.5160607201677],[631.1499087606671,626.5790452873871],[542.4375710957013,870.4882028782671],[533.1636066897687,901.9202898857355],[560.0271290472382,928.3438120454055],[636.9333320662492,927.2211052793612],[701.2872734414615,904.7572821062478],[712.3815638914134,883.1609856725986],[699.6233204196666,846.40625935068],[643.0975682607158,735.5855760602725],[597.2843307846007,927.7062933957425],[681.5875935005818,919.7672048267015],[497.0267079819117,1045.1242763150742],[540.9704075384337,1020.2141491208524],[595.9466527620849,995.427666955418],[623.9338008582349,1012.3867703846325],[657.7195108282572,1002.9031406347887],[694.0553103719504,1017.7093462611649],[731.045133260185,1038.925606061325],[702.06665953107,1076.6370661230396],[671.3224571904506,1090.320929675046],[625.1136808919343,1102.6396308892963],[576.229861348409,1099.4704048182004],[529.2945994157918,1078.1364643384566],[567.9318748714006,1055.7852587711627],[623.2714249757448,1063.550807900975],[667.32457024106,1052.0848390532979],[660.9215967293148,1033.8561429076644],[621.9738336652306,1034.6725236355092],[567.7689674303836,1035.7016583600423],[655.6737626049219,838.6929200999036],[401.1954114648641,653.5267643026757],[508.0628841853031,651.9189934783806],[495.47344911334153,707.8384067309707],[406.701156940141,711.5971255208657],[826.8575764382903,641.1029621203448],[736.5572915945171,640.7005934827749],[747.9842476391383,697.6370891815911],[827.0054679337394,681.6754384186461]]
};
var container = document.getElementById('container');

function setup() {
  var canvas;

  // setup camera capture
  videoInput = createCapture(VIDEO);
  videoInput.size(640, 480);
  videoInput.parent('videoel');

  // setup canvas
  canvas = createCanvas(640, 480, 'WEBGL');
  canvas.parent('overlay');

  // setup tracker
  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(videoInput.elt);

  // setup face deformer
  fd = new faceDeformer();
  fd.init(document.getElementById('webgl'));
  fd.load(document.getElementById('hedda'), masks.hedda, pModel);

  noStroke();
}

function draw() {

  // image(videoInput, 0, 0, width, width*videoInput.height/videoInput.width);
  // filter("gray");

  // get array of face marker positions [x, y] format
  var positions = ctracker.getCurrentPosition(videoInput.canvas);

  // console.log(positions);

  if(positions){
    // for (var i=0; i<positions.length; i++) {
    //   // set the color of the ellipse based on position on screen

    //   // draw ellipse at each position point
    //   ellipse(positions[i][0], positions[i][1], 8, 8);
    // }
    var distance = positions[13][0] - positions[1][0];
    if(distance > 100 && distance < 150) {
      container.classList.add('mid-blur');
      container.classList.remove('no-blur');
    } else if(distance > 150) {
      container.classList.add('no-blur');
      container.classList.remove('mid-blur');
    } else {
      container.classList.remove('no-blur');
      container.classList.remove('mid-blur');
    }

    // if(){

    // }
    fd.draw(positions);
  }

>>>>>>> p5-test
}
