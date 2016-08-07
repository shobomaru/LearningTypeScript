#!perl

use strict;
use warnings;
use IO::Socket;

# http://www.geekpage.jp/programming/perl-network/simple-tcp.php

my $sock = new IO::Socket::INET(
	Listen => 5,
	LocalAddr => 'localhost',
	LocalPort => 12345,
	Proto => 'tcp',
	Reuse => 1
) or die;

while (my $conn = $sock->accept()) {

	print "Hello\n";
	print $conn "Hello\n";

	while (1) {
		my $msg = <$conn> || "";
		if ($msg eq "") {
			sleep 1;
		}
		elsif ($msg eq 'spring') {
			print $conn "Akebono\n";
		}
		elsif ($msg eq 'summer') {
			print $conn "Yoru\n";
		}
		elsif ($msg eq 'fall') {
			print $conn "Yuugure\n";
		}
		elsif ($msg eq 'winter') {
			print $conn "Tsutomete\n";
		}
		elsif ($msg eq 'quit') {
			print $conn "Quit\n";
			last;
		}
	}

	print "Close\n";
	$conn->close();
}

close($sock);
