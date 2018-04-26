// JavaScript Document
function loadCatProduct(id, level)
{
	if(id != 0)
	{
		if(level == 1)
		{
			$('#level2').css('display', 'none');
			$('#level3').css('display', 'none');
		}
		else if(level == 2)
			$('#level3').css('display', 'none');
		$.post('ajax.php?file=admin&fnc=loadCatProduct', {
			id:	id,
			level: level
		}, function(data) {
			if(data)
			{
				var neLevel = level + 1;
				$('#level'+neLevel).html(data);
				$('#level'+neLevel).css('display', '');
			}
			else
				$('#category_id').attr('value', id);
		});
	}
	else
	{
		$('#level2').css('display', 'none');
		$('#level3').css('display', 'none');
		$('#level2').html('');
		$('#level3').html('');
	}
}

function addCart(id)
{
	$.post('ajax.php', {
		fnc:	'addCart',
		id:		id }, function(data)
		{
			alert(data);
			history.go(0);
		});
}
function redirect(url)
{
	window.location = url;
}

function viewCart(index)
{
	var str = '';
	var update = true;
	for(var i = 0; i < arrId.length; i++)
	{
		
		if($('#amount' + i).val()*1 == 0 )
		{
			update = false;
			alert('Số lượng sản phẩm phải > 0');
			break;
		}
		if(str == '')
			str = str + '"' + arrId[i] + '":' + $('#amount' + i).val();				
		else				
			str = str + ',' + '"' + arrId[i] + '":' + $('#amount' + i).val();				
		
	}
	str = '{' + str + '}';		
	if(update)
	{
		$.post('ajax.php', {
			index: index,
			fnc:	'viewCart',
			str:	str
		}, function(data) {
			alert(data);
			history.go(0);
		});
	}
}
function emailGet()
{
	var email = $('#newsletter').val(); 
	$.post('ajax.php', {
		fnc:	'getEmail',
		email:		email }, function(data)
		{
			alert(data);			
		});		
	return false;
}
function menuCatP(id)
{
	var key = '#child_' + id;
	if($(key).css('display') == 'block' || $(key).css('display') == '')
		$(key).css('display','none');
	else
		$(key).css('display', '');
}
/* slide chay logo thuong hieu*/
/*var priviewPage = 0;
function nextBrand(pageNext,isAuto)
{
	var page_current = $('#page_current').val()*1;
	var total_page = $('#total_page').val()*1;
	var index = 0;
	if(isAuto == 1) {
		if(total_page == page_current) {
			pageNext = -1;
			priviewPage = 1;				
		}
		else if(priviewPage == 1 && page_current > 1) {
			pageNext = -1;
		}
		setTimeout('nextBrand(1,1);',10000);
	}
	else {
		setTimeout('nextBrand(1,1);',100000000);
	}
	if((pageNext == 1 && total_page > page_current) || (pageNext == -1 && page_current > 1)) {
		index = page_current + pageNext;
		for(var i = 1; i <= total_page; i++) {
			$('.page-' + i).css('display','none');
		}
		$('#page_current').val(index);
		$('.page-' + index).css('display','');
		$(".sl-bottom").attr("style","padding:10px 18px;");
	}
}
var total_page = $('#total_page').val()*1;
for (var i = 2; i <= total_page; i++) {
	$('.page-' + i).css('display','none');
}
setTimeout('nextBrand(1,1);',10000);*/
/*Ham lay email lien he*/	
	function getEmail()
    	{
    		var email = $('#register_email').val();
    		if(!email || email == 'Nhập email của bạn')
    		{
        		alert('Xin vui lòng nhập email vào!');
        	}
    		else
    		{
	    		var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;
				checkEmail = emailPattern.test(email);
				if(!checkEmail)
				{
					alert('Email nhập vào chưa đúng, xin vui lòng kiểm tra lại!');
				}
				else
				{
					$.post('/ajax.php?file=home&fnc=addEmail', {
						email:	email												
					}, function(data) {
						alert(data);	
						$('#register_email').val('Nhập email của bạn');						
					});
				}
					
    		}
        	return false;
        }
    	function ShareWeb(type) {
    		var url = '';
    		switch (type) {
    		case 1:
    		url = "http://www.facebook.com/sharer.php?u=" + window.location.href + "&p[title]=" + cutoffTitle(document.title);
    		break;
    		case 2:
    		url = "http://twitthis.com/twit?url=" + window.location.href + "&title=" + cutoffTitle(document.title);
    		break;
    		case 3:
    			url = "https://plus.google.com/share?url=" + window.location.href + "&title=" + cutoffTitle(document.title);
    			break;
    		}
    		var newWindow = window.open(url, '', '_blank,resizable=yes,width=800,height=450');
    		newWindow.focus();
    		return false;
    	}
    	function cutoffTitle(title) {
    		title = title.toString();
    		if (title.indexOf('|') > 0) { title = title.substr(0, title.lastIndexOf('|') - 1); }
    		if (title.indexOf('|') > 0) { title = title.substr(0, title.lastIndexOf('|') - 1); }
    		return title;
    	}
    	
        function showNews(id,type) {
            var none = '';
            if(type == 0) {
                none = 'none';
            }
            $('#news_id_' + id).css('display',none);
        }
	function displayColor(img,product_id,index)
	{
		for(var i = 0; i < 20;i++)
		{
			$('#color_index_' + product_id + '_' + i).html('');			
		}
		$('#color_index_' + product_id + '_' + index).html('<span>x</span>');
		$('#product_id_' + product_id).attr('src',img);
	}
	function perpage(id) {
		$('#perpage').val(id);
		$('#perpage_form').submit();
		return true;
	}
	/*Phan trang hang moi ve*/
	var page_no_current = 1;
	function GoToPage(page_no) {		
		$.post('/ajax.php?file=home&fnc=productNew', {
			page_no:	page_no												
		}, function(data) {			
			$('.list-product').html(data);	
			$('li.page-no-'+page_no_current).html('<a rel="nofollow" href="javascript:GoToPage('+page_no_current+'); ">'+page_no_current+'</a>');
			$('li.page-no-'+page_no).html('<span class="current">'+page_no+'</span>');
			var current = 0;
			if(page_no > 1) {
				current = page_no - 1;
				if($('li.page-no-pre').attr("title") == "pre") {
					$('li.page-no-pre').html('<a rel="nofollow" href="javascript:GoToPage('+current+');">Pre</a>');
				}
				else {
					$('<li class="page-no-pre" title="pre"><a rel="nofollow" href="javascript:GoToPage('+current+');">Pre</a></li>').insertBefore('li.page-no-0');
				}
			}
			var totalPage = $('#total_page_new').val();
			
			if(page_no < totalPage) {
				current = page_no + 1;
				$('li.page-no-next').html('<a rel="nofollow" href="javascript:GoToPage('+current+');">Next</a>');
			}
			page_no_current = page_no;
		});
	}	
   	function booking(check)
	{   		
		var product_id = $('#product_id').val();
		var total = $('#quantity_').val();	
		var color = $('#color_select').val();
		var size = $('#size_select').val()*1;
		var content = '';
		if(size == 0)
		{
			alert('Bạn chưa chọn kích cỡ');
			return false;
		}
		if(content == '')
		$.post('/ajax.php?file=home&fnc=booking', {
			product_id:	product_id,
			total:		total,
			size: size,
			color:color
		}, function(data) {
			if(data)
			{
				$('#id_error').html(data);
				return false;
			}
			else			
			{
			    $('#id_error').html('');
			    if(check == 1)
			    {
			    	var url = $('#url_gio_hang').val();				
					window.location.href=url;	
			    }
			    else				
					window.location.reload();
			}
		});
		return false;
	}
   	function changeImage(img)
	{
		$('#img_main').attr('src',img);
	}
	function selectColor(img,color_id,index)
	{
		$('#id_color').val(color_id);
		for(var i = 1; i < 20;i++)
		{
			$('#detail_img_' + i).removeClass('active');
			$('#detail_img_' + i).html('');
		}
		$('#detail_img_' + index).addClass('active');
		$('#detail_img_' + index).html('<span>x</span>');
		img = $.parseJSON($.base64.decode(img));
		var listChild = ''; var parent = ''; var total = 0; var imgLarge = '';
		if(img) {
			parent = img['parent']; total = img['total'];
			imgLarge = parent.replace('/medium','');
		}
		$("a.large").attr("href",imgLarge);
		if(total > 1)
		{
			listChild = '<ul class="clearfix">' + img['child'] + '</ul>';
		}
		$('#color_select').val(color_id);
		$('#list_img_thumb').html(listChild);
		$('#img_main').attr('src',parent);
		$('.large, .gallery').CloudZoom();
		$("a.gallery").fancybox().hover(function() {
			$(this).click();
		});
	}
	function selectSize(index,size_id)
	{
		$('#id_size').val(size_id);
		for(var i = 1; i < 20;i++)
		{
			$('#size_detail_' + i + ' span').attr('class','');
		}
		$('#size_select').val(size_id);		
		$('#size_detail_' + index + ' span').attr('class','active');
	}
	function changeTab(tab)
	{
		for(var i = 1; i < 6; i++)
		{
			$('#tab_' + i).attr('class','');
			$('#content_tab_' + i).css('display','none');
		}
		if(tab == 2)
		{
			var htmlManu = $('#content_tab_2 div.tab-mobile').html();
			if(!htmlManu)
			{
				var manu_id = $('#manu_id').val()*1;
				if(manu_id > 0)
				{
					$.post('/ajax.php?file=home&fnc=getContentManu', {
					manu_id:	manu_id
					}, function(data) {
						$('#content_tab_2 div.tab-mobile').html(data);
					});
				}
				else
				{
					$('#content_tab_2 div.tab-mobile').html('<p>Thương hiệu đang được cập nhật!</p>');
				}
			}
			
		}
		$('#tab_' + tab).attr('class','active');
		$('#content_tab_' + tab).css('display','');
		
	}
changeTab(1);
var is_review = false;
function reviewProduct() {
	if(is_review == true) {
		return false;
	}
	is_review = true;
	$('#content_tab_3 button').css('display','none');
	var content = $('#review_product').val();	
	var point_star = $('#point_star').val();
	var product_id = $('#product_id').val();
	if(content == '' || content == 'Đánh giá nhận xét sản phẩm') {
		alert('Bạn chưa nhập nội dung');
		is_review = false;
		$('#content_tab_3 button').css('display','');
		return false;
	}
	$.post('/ajax.php?file=home&fnc=review', {
		content:	content,
		product_id:	product_id,
		point_star:	point_star
		}, function(data) {
			if(data == 1) {
				alert('Đánh giá thành công! Cảm ơn bạn đã đánh giá nhận xét sản phẩm tại ebon.vn!');	
				$('#content_tab_3 textarea').val('');
			}	
			else {
				alert(data);
			}
	});
	is_review = false;
	$('#content_tab_3 button').css('display','');
	return false;
}	
function setPoint(point) {
	for(var i=1; i<=point; i++) {
		$('#star_' + i).attr('src','/css/home/images/star.png');
	}
	if(point < 5) {
		for(var i=point; i<=5; i++) {
			$('#star_' + i).attr('src','/css/home/images/star_ac.png');
		}
	}
	$('#point_star').val(point);
}
function addTotalDetail(more) {
	var total_current = $('#quantity_').val()*1;
	if(more == -1 && total_current == 1) {
		return false;
	}
	else {
		total_current = total_current + more;
		$('#quantity_').val(total_current);
	}
}
$( document ).ready(function() {
    $('#view-more-manu').click(function() {
        var check = $("#manu-more").css("display");
        if(check == 'none') {
            $("#manu-more").css("display","block");
            $("#view-more-manu").html("Thu gọn");
        } else {
            $("#manu-more").css("display","none");
            $("#view-more-manu").html("Xem thêm");
        }
    });
	if($(".sort-by-custom").length > 0 && $(window).width() < 600){
		$(".sort-by-custom .menu-open").html($(".col-left .menu-open").html());
		$(".col-left").html("");
	}
	/*$( ".menu-open dt" ).on( "click", function() {
		//$( ".menu-open dd" ).removeClass("open");
	    $( this ).next( "dd" ).toggleClass("open" );
	});*/
	$( ".title-tab" ).on( "click", function() {
	    $( this ).parent().toggleClass("active" );
	});
	$( ".sort-by-custom h3" ).on( "click", function() {
	    $( this ).parent().toggleClass("open" );
	});
	$( ".sort-by-custom .close, .sort-by-custom .bottom" ).on( "click", function() {
	    $( this ).parent().toggleClass("open" );
	});
	
	$( "#brand-new" ).on( "click", function() {
	    var htmlManu = $('#content_tab_2 div.tab-mobile').html();
			if(!htmlManu)
			{
				var manu_id = $('#manu_id').val()*1;
				if(manu_id > 0)
				{
					$.post('/ajax.php?file=home&fnc=getContentManu', {
					manu_id:	manu_id
					}, function(data) {
						$('#content_tab_2 div.tab-mobile').html(data);
					});
				}
				else
				{
					$('#content_tab_2 div.tab-mobile').html('<p>Thương hiệu đang được cập nhật!</p>');
				}
			}
	});
	
	
	// mobile menu //
	$("#jPanelMenu-menu ul").html($("#nav").html());
	$( ".off-canvas-toggle" ).click(function() {
		$("#wrapper").toggleClass("open");
		$( "#jPanelMenu-menu" ).toggleClass("open");
		$( "body" ).toggleClass("open");
		return false;
	});
	$( ".menu-close" ).click(function() {
		$("#wrapper").removeClass("open");
		$( "#jPanelMenu-menu" ).removeClass("open");
		$( "body" ).removeClass("open");
		return false;
	});
	// end mobile menu //
});
//$("#number a").html('');